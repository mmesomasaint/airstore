import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import { RETRIEVE_PRODUCT } from '../../query'
import { cleanProduct } from '../../utils'

const LIMIT = 20

export async function GET(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const handle = searchParams.get('handle')
  const variables = {
    handle,
    first: LIMIT,
  }
  const { status, body } = await shopifyFetch({ query: RETRIEVE_PRODUCT, variables })

  if (status === 200) {
    const product = cleanProduct(body.data?.product)
    return Response.json({ status: 200, body: product })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
