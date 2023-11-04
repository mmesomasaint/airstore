import { CollectionFilter } from '@/lib/filter'

export interface CollectionProductsQueryResult {
  id: string
  title: string
  handle: string
  products: {
    nodes: {
      id: string
      createdAt: string
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
    }[]
  }
}

export interface CollectionFilterQueryResult {
  products: {
    nodes: {
      priceRange: {
        minVariantPrice: {
          amount: string
        }
      }
      options: {
        name: string
        values: string[]
      }[]
    }[]
  }
}

export const COLLECTION_QUERY = `
query CollectionProducts ($limit: Int!, $handle: String!, $filter: [ProductFilter!]){
	collection (handle:$handle) {
    id
    handle
    title
    products (first: $limit, filters: $filter) {
      nodes {
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

export const FILTER_QUERY = `
  query CollectionFilter ($limit: Int!, $handle: String!) {
    collection (handle: $handle) {
      products (first: $limit) {
        nodes {
          priceRange {
            minVariantPrice {
              amount
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`

export function generateFilters(filter: CollectionFilter) {
  const activeColors = Object.keys(filter.colors).filter(
    (color) => filter.colors[color]
  )
  const hasActiveColor = activeColors.length > 0
  let filters = Array()

  // Create a color filter, when atleast one color is selected for filtering
  if (hasActiveColor) {
    const colorFilters = activeColors.map((color) => ({
      variantOption: { name: 'Color', value: color },
    }))
    filters = [...filters, ...colorFilters]
  }

  // Create a price filter when there is a max value
  if (filter.price.max > 0) {
    const priceFilter = {
      price: { min: filter.price.min, max: filter.price.max },
    }
    filters = [...filters, priceFilter]
  }

  return filters
}

export function convertToFilter({
  priceRange,
  options,
}: {
  priceRange: { minVariantPrice: { amount: string } }
  options: { name: string; values: string[] }[]
}) {
  const {
    minVariantPrice: { amount: price },
  } = priceRange

  let colors = Array()
  // Only options with name `Color` are allowed in colors list.
  options
    .filter((option) => option.name === 'Color')
    .forEach((option) => colors.push(...option.values))

  return {
    price,
    colors,
  }
}
