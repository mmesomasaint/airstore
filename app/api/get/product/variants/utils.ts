type Variant = {
  id: string
  sku: string
  price: {
    amount: string
  }
  compareAtPrice: {
    amount: string
  }
}

interface VariantByOptionsResult {
  handle: string
  variantBySelectedOptions: Variant
}

export const query = `
query VariantByOptions($handle:String!, $selectedOptions: [SelectedOptionInput!]!) {
  product (handle: $handle) {
    handle
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

export function cleanProductWithVariant(product: VariantByOptionsResult) {
  return {
    handle: product.handle,
    variant: cleanProductVariant(product.variantBySelectedOptions),
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
  }
}
