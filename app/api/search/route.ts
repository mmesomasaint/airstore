import { QueryMiniProduct } from '@/lib/cleanProduct'
import { shopifyFetch } from '@/lib/fetch'
import { Category } from '@/lib/filter'
import { NextRequest } from 'next/server'
import { query, cleanMiniProduct, generateFilterQuery } from './utils'

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const title = searchParams.get('title')
  const { filter } = await req.json()

  if (!title || !filter) {
    return Response.json({ status: 400, message: 'Bad request' })
  }

  const parsedFilter = generateFilterQuery(filter)
  const variables = {
    first: 60,
    query: `title:*${title}* AND ${parsedFilter.price}${
      parsedFilter?.dateAdded ? ' AND ' + parsedFilter.dateAdded : ''
    }`,
  }
  const { status, body } = await shopifyFetch({ query, variables })

  if (status === 200) {
    let results = body.data?.products.edges

    // If there is categories filter, apply it to results.
    if (parsedFilter.categories.length > 0) {
      results = results.filter((result: { node: QueryMiniProduct }) => {
        const { collections } = result.node
        const collectionTitles = collections.nodes.map((node) => node.title)
        let matches = []

        collectionTitles.forEach((title) => {
          // If category appears in title, 
          // flag the category as a match & add to matches list.
          matches = parsedFilter.categories.filter((category) =>
            title.includes(category)
          )
        })

        return matches.length > 0
      })
    }

    // If there is colors filter, apply it to results.
    if (parsedFilter.colors.length > 0) {
      type Option = { name: string; values: string[] }
      
      results = results.filter((result: { node: QueryMiniProduct }) => {
        const { options } = result.node
        const colorOptions = options.filter(
          (option: Option) => option.name === 'Color'
        )
        let matches = []

        colorOptions.forEach((option: Option) => {
          // if any of the filtered color appears in results color options, 
          // flag the color as a match & add to matches list.
          matches = parsedFilter.colors.filter((color: string) =>
            option.values.includes(color)
          )
        })

        return matches.length > 0
      })
    }

    const cleanedResults = results.map(
      ({ node }: { node: QueryMiniProduct }) => cleanMiniProduct(node)
    )
    console.log("Cleaned results len: ", cleanedResults.length)

    return Response.json({ status: 200, body: cleanedResults })
  } else {
    return Response.json({ status: 500, message: 'Error receiving data' })
  }
}
