type Variant = {
  id: string
  sku: string
  price: string
  quantityAvailable: number
  selectedOptions: {
    name: string
    value: string
  }[]
  inventoryItem: {
    inventoryQuantity: string
    tracked: string
    locationId: string
  }
}

type QueryFullProduct = {
  id: string
  title: string
  descriptionHTML: string
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string
    }
  }
  featuredImage: {
    url: string
  }
  variants: {
    nodes: Variant[]
  }
  images: {
    nodes: {
      id: string
      originalSrc: string
      altText: string
    }[]
  }
  options: {
    name: string
    values: string[]
  }[]
  metafields: {
    nodes: {
      id: string
      key: string
      value: string
      namespace: string
    }[]
  }
}

export const query = `
query Product($handle: String!) {
  product (handle: $handle){
    id
    handle
    title
    description
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
      minVariantPrice {
        amount
      }
    }
  }
}
`

export function cleanProduct() {
  // Clean the main product fetch.
}
