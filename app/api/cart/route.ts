import { NextRequest } from 'next/server'
import { shopifyFetch } from '@/lib/fetch'
import { RETRIEVE_CART } from '../query'
import { cleanFullCartResult } from '../utils'

export async function GET(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')

  const { status, body } = await shopifyFetch({
    query: RETRIEVE_CART,
    variables: { cartId },
  })

  if (status === 200) {
    return Response.json({
      status: 200,
      body: cleanFullCartResult(body.data?.cart),
    })
  } else return Response.json({ status: 500, message: 'Error fetching data' })
}
