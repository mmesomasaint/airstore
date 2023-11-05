type Variant = {
  id: string
  sku: string
  price: {
    amount: string
  }
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
  variants: {
    nodes: Variant[]
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
      maxVariantPrice {
        amount
      }
    }
    variants (first: 20) {
      nodes {
        id
        sku
        price {
          amount
        }
        compareAtPrice {
          amount
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
}
`

export const VARIANT_FROM_OPTIONS = `
query VariantByOptions($handle:String!, $selectedOptions: [SelectedOptionInput!]!) {
  product (handle: $handle) {
    title
    variantBySelectedOptions (selectedOptions:$selectedOptions) {
      price {
        amount
      }
      compareAtPrice {
        amount
      }
    }
  }
}
`

export function cleanProduct(product: FullProductQueryResult) {
  const variants = product.variants.nodes.map((variant: Variant) => cleanProductVariant(variant))

  return {
    id: product.id,
    title: product.title,
    descriptionHTML: product.descriptionHTML,
    images: product.images.nodes,
    variants,
    options: product.options,
    price: product.priceRange
      ? Number(product.priceRange.minVariantPrice.amount)
      : null,
    discount: product.compareAtPriceRange
      ? Number(product.compareAtPriceRange.maxVariantPrice.amount)
      : null,
  }
}

export function cleanProductVariant(variant: Variant) {
  return {
    id: variant.id,
    sku: variant.sku,
    price: variant.price ? Number(variant.price.amount) : null,
    discount: variant.compareAtPrice
      ? Number(variant.compareAtPrice.amount)
      : null,
    selectedOptions: variant.selectedOptions,
  }
}
