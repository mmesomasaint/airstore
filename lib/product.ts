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

type Variant = {
  id: string
  sku: string
  price: number
  quantityAvailable: number
  CompareAtPrice: number | null
  selectedOptions: {
    name: string
    value: string
  }[]
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
  variants: Variant[]
  options: {
    name: string
    values: string[]
  }[]
  price: number
  discount: number | null
}