import { shopifyFetch } from "./fetch";

export default function Search(title: string, filter: object) {
  const searchQuery = `title:*${title}*`
  const data = shopifyFetch({
    query: `
    query AllProducts($first: Int = 250, $searchText: String) {
      products(first: $first, query: title:*$searchText*) {
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
      searchText: searchQuery
    }`
  })
}