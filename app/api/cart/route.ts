import { NextRequest } from 'next/server'

export async function GET(Request: NextRequest) {
  const { cart } = await Request.json()
}
