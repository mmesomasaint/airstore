type Variant = {
  id: string
  sku: string
  barcode: string
  weight: string
  height: string
  width: string
  price: string
  originalPrice: string
  inventoryItem: {
    inventoryQuantity: string
    tracked: string
    locationId: string
  }
}

type QueryFullProduct = {
  id: string
  title: string
  description: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string
    }
  }
  featuredImage: {
    id: string
    originalSrc: string
    altText: string
  }
  variants: {
    edges: {
      node: Variant
    }
  }
  publishedAt: string
  updatedAt: string
  images: {
    edges: {
      node: {
        id: string
        originalSrc: string
        altText: string
      }
    }
  }
  options: {
    edges: {
      node: {
        id: string
        name: string
        values: string
      }
    }
  }
  metafields: {
    edges: {
      node: {
        id: string
        key: string
        value: string
        namespace: string
      }
    }
  }
}

export function cleanProduct() {
  // Clean the main product fetch.
}
