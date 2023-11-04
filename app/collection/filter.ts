'use server'

import { shopifyFetch } from '@/lib/fetch'
import { MiniProductQueryResult, cleanMiniProduct } from '../api/search/utils'

interface CollectionFilter {
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

  if (hasActiveColor) {
    const colorFilters = activeColors.map((color) => ({
      variantOption: { name: 'Color', value: color },
    }))
    filters = [...filters, ...colorFilters]
  }

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
  }
}

export async function getCollectionFilters(handle: string) {
  const variables = {
    handle,
    limit: 24
  }
  const {status, body} = await shopifyFetch({query: FILTER_QUERY, variables})

  if (status === 200) {
    const {products: {nodes: productNodes}} = body.data as CollectionFilterQueryResult
    const cleanedFilter = productNodes.map((node) => convertToFilter(node))

    return cleanedFilter.reduce((acc, cur) => {
      const removeDup = (list: any[]) => Array.from(new Set(list))
      const toDefault = (list: any[]) =>
        list.reduce((acc, cur) => ({ ...acc, [cur]: false }), {})
      
      return {
        colors: toDefault(removeDup([...Object.keys(acc.colors), ...cur.colors])),
        price: {
          min: 0,
          max: 0,
          tooMax: Math.max(
            parseInt(cur.price),
            acc.price.tooMax
          ),
        }
      }
    }, {colors: {}, price: {min: 0, max: 0, tooMax: 0}})
  }
}

function convertToFilter({priceRange, options}: {priceRange: {minVariantPrice: {amount: string}}, options: {name: string, values: string[]}[]}) {
  const {minVariantPrice: {amount: price}} = priceRange

  let colors = Array()
  options
    .filter((option) => option.name === 'Color')
    .forEach((option) => colors.push(...option.values))

  return {
    price,
    colors
  }
}