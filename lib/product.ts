export interface Variant {
  id: string
  sku: string
  price: number
  discount: number | null
  quantityAvailable: number
  productHandle: string
}

export interface MiniProduct {
  title: string
  handle: string
  variants: string[]
  src: string
  price: number
  discount: number
  colors: string[]
  rating: number
  amountSold: number
  collectionHandle: string
}

export interface FullProduct {
  id: string
  title: string
  descriptionHTML: string
  images: {
    url: string
    width: number
    height: number
    altText: string
  }[]
  options: {
    name: string
    values: string[]
  }[]
  price: number
  discount: number | null
}
