import { NextRequest } from 'next/server'
import { RETRIEVE_MINI_CART } from '../../query'
import { shopifyFetch } from '@/lib/fetch'
import { cleanMiniCartResult } from '../../utils'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')

  const { status, body } = await shopifyFetch({
    query: RETRIEVE_MINI_CART,
    variables: { cartId },
  })

  if (status === 200) {
    return Response.json({
      status: 200,
      body: cleanMiniCartResult(body.data?.cart),
    })
  } else {
    return Response.json({ status: 500, message: 'Error fetching data' })
  }
}
