import { shopifyFetch } from '@/lib/fetch'
import { query, cleanProductToVariant } from './utils'
import { NextRequest } from 'next/server'

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const handle = searchParams.get('handle')
  const { selectedOptions } = await Request.json()

  const variables = {
    handle,
    selectedOptions,
  }
  const { status, body } = await shopifyFetch({ query, variables })

  if (status === 200) {
    const product = cleanProductToVariant(body.data?.product)
    return Response.json({ status: 200, body: product })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
