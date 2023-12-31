import { shopifyFetch } from '@/lib/fetch'
import { GET_SEARCH_FILTER_KEYS } from '../../query'
import { cleanFilterQueryResult } from '../../utils'

const LIMIT = 20

export async function GET() {
  const variables = {
    first: LIMIT,
  }
  const { status, body } = await shopifyFetch({
    query: GET_SEARCH_FILTER_KEYS,
    variables,
  })

  if (status === 200) {
    const filter = cleanFilterQueryResult(body.data?.products)
    return Response.json({ status: 200, body: filter })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
