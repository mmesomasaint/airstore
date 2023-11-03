'use server'

interface CollectionFilter {
  color: {
    [key: string]: boolean
  }
  price: {
    min: number
    max: number
    tooMax: number
  }
}

const query = `
query CollectionProducts ($limit: Int!, $handle: String!, $priceMax: Int!, $priceMin: Int!){
	collection (handle:$handle) {
    id
    handle
    title
    products (first: $limit, filters: [{price: {max: $priceMax, min: $priceMin}, variantOption: {name: "", value: ""}}]) {
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
        collections (first: 24) {
          nodes {
            title
          }
        }
      }
    }
  }
}
`

export default async function FilterCollection(
  handle: string,
  filter: CollectionFilter
) {}
