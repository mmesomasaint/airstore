import { shopifyFetch } from '@/lib/fetch'
import { NextRequest } from 'next/server'

const query = `
query AllProducts($first: Int, $searchText: String) {
  products(first: $first, query: $searchText) {
    edges {
      node {
        id
        title
        handle
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        compareAtPriceRange {
          maxVariantPrice {
            amount
          }
        }
        options {
          name
          values
        }
      }
    }
  }
}
`

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const title = searchParams.get('title')
  const { filter } = await req.json()

  if (!title || !filter) {
    return Response.json({ status: 400, message: 'Bad request' })
  }

  const variables = {
    first: 60,
    searchText: `title:*${title}*`
  }
  const { status, body } = await shopifyFetch({ query, variables })

  if (status === 200) {
    return Response.json({ status: 200, body: body.data.products.edges })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
