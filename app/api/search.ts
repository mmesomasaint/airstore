import { shopifyFetch } from '@/lib/fetch'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  status: number
  message?: string
  body?: JSON
}

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { title } = req.query
  const {filter} = req.body

  if (!title || !filter) {
    res.status(400).json({status: 400, message: "Bad request"})
  }

  const variables = `{
    first: 60,
    searchText: title:*${title}*
  }`

  const {status, body} = await shopifyFetch({query, variables})
  if (status === 200) {
    res.status(200).json({status: 200, body: body.data.products.edges})
  } else {
    res.status(500).json({status: 500, message: "Error receiving data"})
  }
}