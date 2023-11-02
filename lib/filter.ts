export interface Filter {
  categories: {
    [key: string]: boolean
  }
  colors: {
    [key: string]: boolean
  }
  price: {
    min: number
    max: number
  }
  dateAdded: {
    [key: string]: boolean
  }
}

export interface FilterQueryResult {
  nodes: {
    id: string
    createdAt: string
    options: {
      name: string
      values: string[]
    }[]
    priceRange: {
      minVariantPrice: {
        amount: string
      }
    }
    collections: {
      nodes: {
        title: string
      }[]
    }
  }[]
}

export type FilterSection = 'categories' | 'colors' | 'price' | 'dateAdded'

export type Category = 'airpod' | 'macbook' | 'iWatch' | 'iPad' | 'iPhone'

export const DefaultFilter: Filter = {
  categories: {
    airpod: false,
    macbook: false,
    iWatch: false,
    iPad: false,
    iPhone: false,
  },
  colors: {
    red: false,
    blue: false,
  },
  price: {
    min: 0,
    max: 0,
  },
  dateAdded: {
    2023: false,
    2022: false,
    2021: false,
    2020: false,
  },
}

export const generateFilterQuery = (filter: Filter) => {
  const { categories, price, colors, dateAdded } = filter
  const activeDateAdded = Object.keys(dateAdded).filter((key) => dateAdded[key])

  return {
    categories: Object.keys(categories).filter((key) => categories[key]),
    colors: Object.keys(colors).filter((key) => colors[key]),
    price: `variants.price:>=${price.min}${
      price.max && ` AND variants.price:<=${price.max}`
    }`,
    dateAdded: `created_at:>${activeDateAdded[0]}`,
  }
}

export const cleanFilterQueryResult = (
  queryResult: FilterQueryResult
): Filter => {
  const { nodes: productNodes } = queryResult
  return productNodes.reduce(
    (acc, cur) => {
      const removeDup = (list: any[]) => Array.from(new Set(list))
      const toDefault = (list: any[]) =>
        list.reduce((acc, cur) => ({ ...acc, [cur]: false }), {})
      const {
        options,
        priceRange,
        createdAt,
        collections: { nodes: collectionNodes },
      } = cur
      const categoryTitles = [
        'Airpod',
        'MacBook',
        'IPhone',
        'Watch',
        'IPad',
        'Mac',
      ]
      const categories = collectionNodes.map((node) => {
        const title = node.title
        const idx = categoryTitles.findIndex((categoryTitle) =>
          title.includes(categoryTitle)
        )
        if (idx !== -1) return categoryTitles[idx]
      })
      let colors = Array()

      options
        .filter((option) => option.name === 'Color')
        .forEach((option) => colors.push(...option.values))

      return {
        colors: toDefault(removeDup([...Object.keys(acc.colors), ...colors])),
        dateAdded: toDefault(
          removeDup([
            ...Object.keys(acc.dateAdded),
            new Date(createdAt).getFullYear(),
          ])
        ),
        price: {
          min: 0,
          max: Math.max(
            parseInt(priceRange.minVariantPrice.amount),
            acc.price.max
          ),
        },
        categories: toDefault(
          removeDup([...Object.keys(acc.categories), ...categories])
        ),
      }
    },
    {
      colors: {},
      dateAdded: {},
      price: { min: 0, max: 0 },
      categories: {},
    }
  )
}
