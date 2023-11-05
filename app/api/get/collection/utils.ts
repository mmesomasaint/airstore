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

/**
 * Generates a filter that can be passed as query.
 * @param filter The filter object used by collection page
 * @returns A filter that can be passed to query
 */
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

/**
 * Converts a query result to a clean filter
 * @param priceRange The priceRange field from the product query
 * @param options The options field from the product query
 * @returns A cleaner filter that can be used by collection page
 */
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
