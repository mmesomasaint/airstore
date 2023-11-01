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

export type QueryMiniProduct = {
  id: string
  title: string
  handle: string
  totalInventory: number
  featuredImage: {
    url: string
  }
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
  options: {
    name: string
    values: string[]
  }[]
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

export function cleanMiniProduct(queryResult: QueryMiniProduct) {
  const {
    id,
    title,
    handle,
    featuredImage,
    priceRange,
    compareAtPriceRange,
    options,
  } = queryResult
  const { url } = featuredImage
  const { minVariantPrice } = priceRange
  const { maxVariantPrice } = compareAtPriceRange
  let colors = Array()
  
  options.filter((option) => option.name === 'Color').forEach((option) => colors.push(...option.values)) 

  return {
    id,
    title,
    handle,
    src: url,
    price: parseInt(minVariantPrice.amount),
    discount: parseInt(maxVariantPrice.amount),
    colors,
  }
}