import { Filter } from '@/lib/filter'

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

export interface MiniProductQueryResult {
  id: string
  title: string
  handle: string
  totalInventory: number
  featuredImage: {
    url: string
  }
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string
    }
  }
  options: {
    name: string
    values: string[]
  }[]
  collections: {
    nodes: {
      handle: string
      title: string
    }[]
  }
}

export const query = `
query AllProducts($first: Int, $query: String) {
  products(first: $first, query: $query) {
    edges {
      node {
        id
        title
        handle
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
          }
        }
        options {
          name
          values
        }
        collections(first: 10) {
          nodes {
            handle
            title
          }
        }
      }
    }
  }
}
`

export const generateFilterQuery = (filter: Filter) => {
  const { categories, price, colors, dateAdded } = filter
  const activeDateAdded = Object.keys(dateAdded).filter((key) => dateAdded[key])
  const priceMaxQuery = ` AND variants.price:<=${price.max}`

  return {
    categories: Object.keys(categories).filter((key) => categories[key]),
    colors: Object.keys(colors).filter((key) => colors[key]),
    price: `(variants.price:>=${price.min}${
      price.max > 0 ? priceMaxQuery : ''
    })`,
    dateAdded:
      activeDateAdded.length > 0 && `(created_at:>${activeDateAdded[0]})`,
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
          max: 0,
          tooMax: Math.max(
            parseInt(priceRange.minVariantPrice.amount),
            acc.price.tooMax
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
      price: { min: 0, max: 0, tooMax: 0 },
      categories: {},
    }
  )
}

export function cleanMiniProduct(queryResult: MiniProductQueryResult) {
  const {
    id,
    title,
    handle,
    featuredImage,
    priceRange,
    compareAtPriceRange,
    options,
    collections
  } = queryResult
  const { url } = featuredImage
  const { minVariantPrice } = priceRange
  const { maxVariantPrice } = compareAtPriceRange
  const collectionHandles = collections.nodes.map((node) => node.handle)

  let colors = Array()
  options
    .filter((option) => option.name === 'Color')
    .forEach((option) => colors.push(...option.values))

  return {
    id,
    title,
    handle,
    colors,
    src: url,
    price: parseInt(minVariantPrice.amount),
    discount: parseInt(maxVariantPrice.amount),
    collectionHandle: collectionHandles[0]
  }
}
