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
    src: 'https://istore.com.ng/cdn/shop/products/iPhone14Pro_Gold_cf2d9f84-35c5-4097-92a8-cbdfcfb50719_2048x.png?v=1668767187',
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
    src: 'https://istore.com.ng/cdn/shop/products/amsb_2048x.jpg?v=1616762774',
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
    src: 'https://istore.com.ng/cdn/shop/products/iPhone14Pro_Gold_cf2d9f84-35c5-4097-92a8-cbdfcfb50719_2048x.png?v=1668767187',
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
    src: 'https://istore.com.ng/cdn/shop/products/iPad_ProM2_WiFi_Silver_Position3_2048x.png?v=1667318609',
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
    src: 'https://istore.com.ng/cdn/shop/products/amsb_2048x.jpg?v=1616762774',
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
    src: 'https://istore.com.ng/cdn/shop/products/MacBookPro_SpaceGrey_61b5fbea-0a1d-4239-8219-441310f70ee3_2048x.png?v=1671640275',
    price: 1552,
    discount: 2585,
    colors: ['silver', 'gray', 'brown'],
    rating: 4.8,
    amountSold: 680,
    category: 'Macbook',
  },
  {
    title: 'Apple Watch Ultra 2',
    variants: ['32GB', '64GB', '128GB'],
    src: 'https://istore.com.ng/cdn/shop/files/Apple_Watch_Ultra_2_LTE_49mm_Titanium_Blue_Alpine_Loop_PDP_Image_Position-1__WWEN_2048x.jpg?v=1696641289',
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
    src: 'https://istore.com.ng/cdn/shop/products/AirPodsPro_2ndGen_Main_2048x.png?v=1664885521',
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
    src: 'https://istore.com.ng/cdn/shop/products/amsb_2048x.jpg?v=1616762774',
    price: 352,
    discount: 585,
    colors: ['blue', 'yellow', 'red', 'black', 'white', 'lime'],
    rating: 3.8,
    amountSold: 300,
    category: 'Airpod',
  },
]
