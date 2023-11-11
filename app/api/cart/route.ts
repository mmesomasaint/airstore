import { NextRequest } from 'next/server'

export async function GET(Request: NextRequest) {
  const searchParams = Request.nextUrl.searchParams
  const cartId = searchParams.get('cartId')
  const { cartLines } = await Request.json()

  
}
