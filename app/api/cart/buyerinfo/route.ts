import { shopifyFetch } from '@/lib/fetch'
import {NextRequest} from 'next/server'
import { UPDATE_CUSTOMER_QUERY } from '../utils'

export default async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')
  const {buyerIdentity} = await Request.json()

  const variables = {
    cartId,
    buyerIdentity
  }
  const {status, body} = await shopifyFetch({query: UPDATE_CUSTOMER_QUERY, variables})

  if (status === 200) return Response.json({status, body: body.data.cart})
  else return Response.json({status: 500, message: 'Error receiving data'})
}