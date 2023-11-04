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

export function cleanProduct() {
  // Clean the main product fetch.
}
