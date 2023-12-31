import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import { CREATE_CART } from '../../query'
import { cleanMiniCartResult, generateCreateCartInput } from '../../utils'

export async function POST(Request: NextRequest) {
  const { lines } = await Request.json()
  const { input } = generateCreateCartInput(lines)

  const { status, body } = await shopifyFetch({
    query: CREATE_CART,
    variables: { input },
  })

  if (status === 200) {
    const cart = cleanMiniCartResult(body.data?.cartCreate?.cart)
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
