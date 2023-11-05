type Variant = {
  id: string
  sku: string
  price: {
    amount: string
  }
  compareAtPrice: {
    amount: string
  }
  quantityAvailable: number
}

interface VariantByOptionsResult {
  handle: string
  variantBySelectedOptions: Variant
}

export const query = `
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

export function cleanProductToVariant(product: VariantByOptionsResult) {
  return {
    ...cleanProductVariant(product.variantBySelectedOptions),
    productHandle: product.handle,
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
    quantityAvailable: variant.quantityAvailable,
  }
}
