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
  collections: {
    nodes: {
      id: string
      title: string
    }[]
  }
  products: {
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
    }[]
  }
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
  const activePrice = [price.min, price.max]

  return {
    categories: Object.keys(categories).filter((key) => categories[key]),
    colors: Object.keys(colors).filter((key) => colors[key]),
    price: `variants.price:>=${price.min}${
      price.max && ` AND variants.price:<=${price.max}`
    }`,
    dateAdded: `created_at:>${activeDateAdded[0]}`,
  }
}

export const cleanFilterQueryResult = (queryResult: FilterQueryResult) => {
  const { nodes: collectionNodes } = queryResult.collections
  const collections = collectionNodes.map((node) => node.title)
  const { nodes: productNodes } = queryResult.products
  const products = productNodes.map((node) => {
    const { options, priceRange, createdAt } = node
    let colors = Array()

    options
      .filter((option) => option.name === 'Color')
      .forEach((option) => colors.push(...option.values))

    return {
      colors,
      createdAt,
      price: parseInt(priceRange.minVariantPrice.amount),
    }
  })

  return {
    collections,
    ...products,
  }
}
