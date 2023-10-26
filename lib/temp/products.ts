export interface Product {
  title: string
  variants: string[]
  src: string
  price: number
  discount: number
  colors: string[]
  rating: number
  amountSold: number
  category?: string
}

export const products: Product[] = [
  {
    title: 'Apple iPhone 14 pro',
    variants: ['64GB', '128GB', '256GB', '512GB'],
    src: '/imgs/iphone-red-fv.webp',
    price: 524,
    discount: 852,
    colors: ['white', 'gray', 'red'],
    rating: 4.9,
    amountSold: 500,
    category: 'iPhone',
  },
  {
    title: 'Apple Airpods Max',
    variants: ['Noise Cancellation'],
    src: '/imgs/airpods-max-snowy.webp',
    price: 122,
    discount: 385,
    colors: ['blue', 'yellow', 'red', 'black', 'white', 'lime'],
    rating: 3.8,
    amountSold: 190,
    category: 'Airpod',
  },
  {
    title: 'Apple iPhone 14 pro',
    variants: ['64GB', '128GB', '256GB'],
    src: '/imgs/iphone-white-fv.webp',
    price: 342,
    discount: 815,
    colors: ['white', 'gray', 'red'],
    rating: 4.3,
    amountSold: 480,
    category: 'iPhone',
  },
  {
    title: 'Apple iPad Pro',
    variants: ['128GB', '256GB'],
    src: '/imgs/ipad-sv.webp',
    price: 352,
    discount: 585,
    colors: ['lime', 'gray', 'zinc'],
    rating: 3.8,
    amountSold: 430,
    category: 'iPad',
  },
  {
    title: 'Apple Airpods Max',
    variants: ['Noice Cancellation'],
    src: '/imgs/airpods-max-black.webp',
    price: 352,
    discount: 585,
    colors: ['blue', 'yellow', 'red', 'black', 'white', 'lime'],
    rating: 3.8,
    amountSold: 160,
    category: 'Airpod',
  },
  {
    title: 'Apple Macbook Pro M1',
    variants: ['256GB', '512GB', '1TB'],
    src: '/imgs/macbook-pro-fv-1.webp',
    price: 1552,
    discount: 2585,
    colors: ['silver', 'gray', 'brown'],
    rating: 4.8,
    amountSold: 680,
    category: 'Macbook',
  },
  {
    title: 'Apple iWatch Ultra',
    variants: ['32GB', '64GB', '128GB'],
    src: '/imgs/iwatch-yellow-sv.webp',
    price: 352,
    discount: 585,
    colors: ['lime', 'gray', 'zinc'],
    rating: 3.5,
    amountSold: 290,
    category: 'iWatch',
  },
  {
    title: 'Airpods Pro 2nd Gen',
    variants: ['Noice Cancellation'],
    src: '/imgs/airpods-pro-2nd-gen-singleton-sv.webp',
    price: 152,
    discount: 285,
    colors: ['black', 'gray', 'zinc', 'yellow'],
    rating: 4.0,
    amountSold: 680,
    category: 'Airpod',
  },
  {
    title: 'Apple Airpods Max',
    variants: ['16GB', '32GB', '64GB'],
    src: '/imgs/airpods-max-blue.webp',
    price: 352,
    discount: 585,
    colors: ['blue', 'yellow', 'red', 'black', 'white', 'lime'],
    rating: 3.8,
    amountSold: 300,
    category: 'Airpod',
  },
]
