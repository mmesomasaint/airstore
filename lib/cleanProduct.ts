type Variant = {
  id: string
  sku: string
  price: string
  quantityAvailable: number
  compareAtPrice: {
    amount: string
  }
  selectedOptions: {
    name: string
    value: string
  }[]
}

type FullProductQueryResult = {
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
  variants: Variant[]
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
    variants {
      id
      sku
      price
      quantityAvailable
      compareAtPrice
      selectedOptions {
        name
        value
    }
  }
}
`

export function cleanProduct(product: FullProductQueryResult) {
    const variants = product.variants.map((variant: Variant) => ({
      id: variant.id,
      sku: variant.sku,
      price: Number(variant.price),
      quantityAvailable: variant.quantityAvailable,
      compareAtPrice: variant.compareAtPrice
        ? Number(variant.compareAtPrice.amount)
        : null,
      selectedOptions: variant.selectedOptions,
    }))

    return {
      id: product.id,
      title: product.title,
      descriptionHTML: product.descriptionHTML,
      images: product.images.nodes,
      variants,
      options: product.options,
      price: Number(product.priceRange.minVariantPrice.amount),
      discount: product.compareAtPriceRange
        ? Number(product.compareAtPriceRange.maxVariantPrice.amount)
        : null,
    }
  }
