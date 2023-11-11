import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'
import { GET_VARIANTS_BY_SELECTED_OPTIONS } from '@/app/api/query'
import { cleanProductToVariant } from '@/app/api/utils'

export async function POST(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const handle = searchParams.get('handle')
  const { selectedOptions } = await Request.json()

  const variables = {
    handle,
    selectedOptions,
  }
  const { status, body } = await shopifyFetch({ query: GET_VARIANTS_BY_SELECTED_OPTIONS, variables })

  if (status === 200) {
    const product = cleanProductToVariant(body.data?.product)
    return Response.json({ status: 200, body: product })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
