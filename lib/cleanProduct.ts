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

type FullProductQuery = {
  id: string
  title: string
  descriptionHTML: string
  images: {
    nodes: {
      url: string
      width: number
      height: number
      altText: string
    }[]
  }
  options: {
    name: string
    values: string[]
  }[]
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
