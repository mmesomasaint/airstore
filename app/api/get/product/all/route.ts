import { RETRIEVE_ALL_PRODUCTS } from '@/app/api/query'
import { MiniProductQueryResult } from '@/app/api/types'
import { cleanMiniProduct } from '@/app/api/utils'
import { shopifyFetch } from '@/lib/fetch'

const LIMIT = 24

export async function GET() {
  const variables = {
    first: LIMIT,
  }

  const { status, body } = await shopifyFetch({
    query: RETRIEVE_ALL_PRODUCTS,
    variables,
  })

  if (status === 200) {
    const results = body.data?.products.edges

    const cleanedResults = results.map(
      ({ node }: { node: MiniProductQueryResult }) => cleanMiniProduct(node)
    )

    return Response.json({ status, body: cleanedResults })
  } else
    return Response.json({ status: 500, message: 'Error receiving data..' })
}
