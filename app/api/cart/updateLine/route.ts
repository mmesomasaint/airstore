import { NextRequest } from 'next/server'
import { shopifyFetch } from '@/lib/fetch'
import { UPDATE_CART_LINES } from '@/app/api/query'
import { cleanMiniCartResult } from '@/app/api/utils'

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')
  const { lines } = await Request.json()

  const variables = { cartId, lines }
  
  const { status, body } = await shopifyFetch({
    query: UPDATE_CART_LINES,
    variables,
  })

  if (status === 200) {
    const cart = cleanMiniCartResult(body.data?.cartLinesUpdate?.cart)
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
