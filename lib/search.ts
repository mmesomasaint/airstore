import { shopifyFetch } from './fetch'

export default async function Search(title: string, filter: object) {
  return shopifyFetch({
    query: `
    query AllProducts($first: Int = 250, $searchText: String) {
      products(first: $first, query: $searchText) {
        id
        title
        handle
        description
        descriptionHtml
        featuredImage
        images(first: 1) {
          url
        }
      }
    }
    `,
    variables: `{
      first: 250,
      searchText: title:*${title}*
    }`,
  })
}
