import { Filter } from "@/lib/filter"

export const query = `
query GetFilters($first: Int) {
  products(first: $first) {
    nodes {
      id
      createdAt
      priceRange {
        minVariantPrice {
          amount
        }
      }
      options {
        name
        values
      }
      collections (first: $first) {
        nodes {
          title
        }
      }
    }
  }
}
`

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