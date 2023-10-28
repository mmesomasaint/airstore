import { shopifyFetch } from './fetch'

export default async function Search(title: string, filter: object) {
  return shopifyFetch({
    query: `
    query AllProducts($first: Int, $searchText: String) {
      products(first: $first, query: $searchText) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            featuredImage {
              url
            }
            images(first: 1) {
              nodes {
                url
              }
            }
          }
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
