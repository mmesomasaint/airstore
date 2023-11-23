import { NextRequest } from 'next/server'
import { shopifyFetch } from '@/lib/fetch'
import { UPDATE_CART_LINES } from '../../query'
import { cleanMiniCartResult, generateCartLinesInput } from '../../utils'

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')
  const { cartLines } = await Request.json()
  const variables = { cartId, lines: generateCartLinesInput(cartLines) }

  const { status, body } = await shopifyFetch({
    query: UPDATE_CART_LINES,
    variables,
  })

  if (status === 200) {
    const cart = cleanMiniCartResult(body.data?.cart)
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
