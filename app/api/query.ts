export const CREATE_CART = `
mutation ($input: CartInput) {
  cartCreate(input: $input) {
    cart {
      id
      lines(first: 10) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
  }
}
`

export const UPDATE_CART_LINES = `
mutation ($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(
    cartId: $cartId
    lines: $lines
  ) {
    cart {
      id
      lines(first: 10) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
  }
}
`

export const ADD_CART_LINES = `
mutation ($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(
    cartId: $cartId
    lines: $lines
  ) {
    cart {
      id
      lines(first: 10) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
  }
}
`

export const RETRIEVE_CART = `
query ($cartId: ID!) {
  cart(id: $cartId) {
    id
    lines(first: 10) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
          }
        }
        attributes {
          key
          value
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
      deliveryAddressPreferences {
        ... on MailingAddress {
          address1
          address2
          city
          provinceCode
          countryCodeV2
          zip
        }
      }
    }
  }
}
`
// check this as BuyerIdentity
// {
//   email: "example@example.com"
//   phone: "555-555-555"
//   countryCode: CA
// }

export const UPDATE_CUSTOMER_INFO = `
mutation ($cartId: String!, $buyerIdentity: BuyerIdentity) {
  cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
    cart {
      id
      buyerIdentity {
        email
        phone
        countryCode
      }
    }
  }
}
`

export const GET_COLLECTION_PRODUCTS = `
query CollectionProducts ($limit: Int!, $handle: String!, $filter: [ProductFilter!]){
	collection (handle:$handle) {
    id
    handle
    title
    products (first: $limit, filters: $filter) {
      nodes {
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

export const GET_COLLECTION_FILTER_KEYS = `
  query CollectionFilter ($limit: Int!, $handle: String!) {
    collection (handle: $handle) {
      products (first: $limit) {
        nodes {
          priceRange {
            minVariantPrice {
              amount
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`

export const GET_SEARCH_FILTER_KEYS = `
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

export const GET_VARIANTS_BY_SELECTED_OPTIONS = `
query VariantByOptions($handle:String!, $selectedOptions: [SelectedOptionInput!]!) {
  product (handle: $handle) {
    handle
    variantBySelectedOptions (selectedOptions: $selectedOptions) {
      id
      sku
      price {
        amount
      }
      compareAtPrice {
        amount
      }
      quantityAvailable
    }
  }
}
`

export const RETRIEVE_PRODUCT = `
query Product($handle: String!) {
  product (handle: $handle){
    id
    handle
    title
    descriptionHtml
    images (first: 10) {
      nodes {
        url
        width
        height
        altText
      }
    }
    options {
      name
      values
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
  }
}
`

export const SEARCH_AND_FILTER_PRODUCTS = `
query AllProducts($first: Int, $query: String) {
  products(first: $first, query: $query) {
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

export const RETRIEVE_ALL_PRODUCTS = `
query AllProducts($first: Int!) {
  products(first: $first) {
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
    pageInfo {
      hasNextPage
      cursor
    }
  }
}
`
export const RETRIEVE_PRODUCTS_AFTER_CURSOR = `
query AllProducts($first: Int!, $cursor: String!) {
  products(first: $first, after: $cursor) {
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
    pageInfo {
      hasNextPage
      cursor
    }
  }
}
`
