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
    `,
    variables: `{
      first: 250,
      searchText: title:*${title}*
    }`,
  })
}
