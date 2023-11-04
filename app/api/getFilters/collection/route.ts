import { shopifyFetch } from '@/lib/fetch'
import { MiniProductQueryResult, cleanMiniProduct } from '../../search/utils'
import { NextRequest } from 'next/server'
import { COLLECTION_QUERY, CollectionFilterQueryResult, FILTER_QUERY, convertToFilter, generateFilters } from './utils'

export default async function POST(
  Request: NextRequest
) {
  const searchParams = Request.nextUrl.searchParams
  const handle = searchParams.get('handle')
  const {filter} = await Request.json()

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

    return Response.json({status: 200, body:{
      id,
      title,
      handle,
      products: cleanedProducts,
    }}) 
  } else return Response.json({status: 500, message: 'Error filtering collection'})
}

export async function GET(
  Request: NextRequest
) {
  const searchParams = Request.nextUrl.searchParams
  const handle = searchParams.get('handle')
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
