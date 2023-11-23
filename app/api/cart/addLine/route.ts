import { NextRequest } from 'next/server'
import { shopifyFetch } from '@/lib/fetch'
import { ADD_CART_LINES } from '@/app/api/query'
import { cleanMiniCartResult, generateCartLinesInput } from '@/app/api/utils'

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')
  const { lines } = await Request.json()

  const variables = { cartId, lines: generateCartLinesInput(lines) }

  const { status, body } = await shopifyFetch({
    query: ADD_CART_LINES,
    variables,
  })

  if (status === 200) {
    const cart = cleanMiniCartResult(body.data?.cart)
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
