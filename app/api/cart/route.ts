import { NextRequest } from 'next/server'
import { RETRIEVE_CART_QUERY, cleanFullCartResult } from './utils'
import { shopifyFetch } from '@/lib/fetch'

export async function GET(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')

  const variables = {cartId}
  const {status, body} = await shopifyFetch({query: RETRIEVE_CART_QUERY, variables})

  if (status === 200) {
    return Response.json({status: 200, body: cleanFullCartResult(body.data?.cart)})
  } else return Response.json({status: 500, message: 'Error fetching data'})
}
