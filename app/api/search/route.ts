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
        variants(first: 10) {
          nodes {
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
}
`

export async function POST(req: NextRequest) {
  // console.log('I am here')
  const searchParams = req.nextUrl.searchParams
  const title = searchParams.get('title')
  const { filter } = await req.json()

  if (!title || !filter) {
    Response.json({ status: 400, message: 'Bad request' })
  }

  const variables = `{
    first: 60,
    searchText: title:*${title}*
  }`
  const { status, body } = await shopifyFetch({ query, variables })
  //console.log('body: ', body)

  if (status === 200) {
    Response.json({ status: 200, body: body.data.products.edges })
  } else {
    Response.json({ status: 500, message: 'Error receiving data' })
  }
}
