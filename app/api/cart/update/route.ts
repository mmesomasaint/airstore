import { NextRequest } from 'next/server'
import {
  UPDATE_LINES_QUERY,
  cleanMiniCartResult,
  generateCartLinesInput,
} from '../utils'
import { shopifyFetch } from '@/lib/fetch'

export default async function POST(Request: NextRequest) {
  const { cartLines } = await Request.json()
  const variables = { cartLines: generateCartLinesInput(cartLines) }

  const { status, body } = await shopifyFetch({
    query: UPDATE_LINES_QUERY,
    variables,
  })

  if (status === 200) {
    const cart = cleanMiniCartResult(body.data?.cart)
    return Response.json({ status: 200, body: cart })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
