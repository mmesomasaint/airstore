import { QueryMiniProduct } from '@/lib/cleanProduct'
import { shopifyFetch } from '@/lib/fetch'
import { Category } from '@/lib/filter'
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
        collections(first: 10) {
          nodes {
            handle
            title
          }
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
    searchText: `title:*${title}* AND ${filter.price}${
      filter?.dateAdded ? ' AND ' + filter.dateAdded : ''
    }`,
  }
  const { status, body } = await shopifyFetch({ query, variables })

  if (status === 200) {
    let results = body.data?.products.edges

    // If there is categories filter, apply it to results.
    if (filter.categories.length > 0) {
        results = results.filter((result: {node: QueryMiniProduct}) => {
        const { collections } = result.node
        const collectionTitles = collections.nodes.map((node) => node.title)
        let matches = []
        collectionTitles.forEach((title) => {
          matches = filter.categories.filter((category: Category) => title.includes(category))
        })
        return matches.length > 0
      })
    }

    // If there is colors filter, apply it to results.
    if (filter.colors.length > 0) {
        type Option = {name: string; values: string[]}
        results = results.filter((result: {node: QueryMiniProduct}) => {
        const { options } = result.node
        const colorOptions = options.filter((option: Option) => option.name === 'Color')
        let matches = []
        colorOptions.forEach((option: Option) => {
          matches = filter.colors.filter((color: string) => option.values.includes(color))
        })
        return matches.length > 0
      })
    }

    return Response.json({ status: 200, body: results })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
