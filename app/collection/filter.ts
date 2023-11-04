'use server'

import { shopifyFetch } from '@/lib/fetch'
import { MiniProductQueryResult, cleanMiniProduct } from '../api/search/utils'

export interface CollectionFilter {
  colors: {
    [key: string]: boolean
  }
  price: {
    min: number
    max: number
    tooMax: number
  }
}

interface CollectionProductsQueryResult {
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

interface CollectionFilterQueryResult {
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

const COLLECTION_QUERY = `
query CollectionProducts ($limit: Int!, $handle: String!, $filter: [filter!]!){
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

const FILTER_QUERY = `
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

function generateFilters(filter: CollectionFilter) {
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

export default async function filterCollection(
  handle: string,
  filter: CollectionFilter
) {
  const variables = {
    handle,
    limit: 24,
    filter: generateFilters(filter),
  }
  const { status, body } = await shopifyFetch({
    query: COLLECTION_QUERY,
    variables,
  })

  if (status === 200) {
    // Convert product query result into a readable format.
    const { id, title, handle, products } = body.data
    const cleanedProducts = products.nodes.map((node: MiniProductQueryResult) =>
      cleanMiniProduct(node)
    )

    return {
      id,
      title,
      handle,
      products: cleanedProducts,
    }
  } else throw new Error('Error filtering collection')
}

export async function getCollectionFilters(handle: string) {
  const variables = {
    handle,
    limit: 24,
  }
  const { status, body } = await shopifyFetch({
    query: FILTER_QUERY,
    variables,
  })

  if (status === 200) {
    // Convert the query result into a useable filter format
    const {
      products: { nodes: productNodes },
    } = body.data as CollectionFilterQueryResult
    const cleanedFilter = productNodes.map((node) => convertToFilter(node))

    // Reduce the cleaned filter list into a single unit
    return cleanedFilter.reduce(
      (acc, cur) => {
        // Remove duplicate items from a list.
        const removeDup = (list: any[]) => Array.from(new Set(list))

        // Convert a list to an object with properties `false`.
        const toDefault = (list: any[]) =>
          list.reduce((acc, cur) => ({ ...acc, [cur]: false }), {})

        return {
          colors: toDefault(
            removeDup([...Object.keys(acc.colors), ...cur.colors])
          ),
          price: {
            min: 0,
            max: 0,
            tooMax: Math.max(parseInt(cur.price), acc.price.tooMax),
          },
        }
      },
      { colors: {}, price: { min: 0, max: 0, tooMax: 0 } }
    )
  } else throw new Error('Error fetching collection filters.')
}

function convertToFilter({
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
