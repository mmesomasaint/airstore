import { Variant, cleanProductVariant } from "../utils"

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