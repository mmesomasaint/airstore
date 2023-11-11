import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import { CREATE_CART_QUERY, cleanMiniCartResult } from '../utils'

export default async function POST(Request: NextRequest) {
  const { cartLines } = await Request.json()

  const variables = { cartLines }
  const { status, body } = await shopifyFetch({
    query: CREATE_CART_QUERY,
    variables,
  })

  if (status === 200) {
    const cart = cleanMiniCartResult(body.data?.cart)
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
