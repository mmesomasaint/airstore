import { shopifyFetch } from '@/lib/fetch'

const query = `
query GetFilters($first: Int) {
  products(first: $first) {
    nodes {
      id
      createdAt
      priceRange {
        minVariantPrice {
          amount
        }
      }
      options {
        name
        values
      }
      collections (first: $first) {
        nodes {
          title
        }
      }
    }
  }
}
`

const LIMIT = 20

export async function GET() {
  const variables = {
    first: LIMIT,
  }
  const { status, body } = await shopifyFetch({ query, variables })

  if (status === 200) {
    return Response.json({ status: 200, body: body.data.products.nodes })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
