export interface Filter {
  categories: {
    airpod: boolean
    macbook: boolean
    iWatch: boolean
    iPad: boolean
    iPhone: boolean
  }
  color: {
    [key: string]: boolean
  }
  price: {
    min: number
    max: number
  }
  releaseDate: {
    [key: string]: boolean
  }
}

export type FilterSection =
  | 'categories'
  | 'color'
  | 'price'
  | 'releaseDate'

export type Category = 'airpod' | 'macbook' | 'iWatch' | 'iPad' | 'iPhone'

export const DefaultFilter: Filter = {
  categories: {
    airpod: false,
    macbook: false,
    iWatch: false,
    iPad: false,
    iPhone: false,
  },
  color: {
    red: false,
    blue: false
  },
  price: {
    min: 0,
    max: 0,
  },
  releaseDate: {
    2023: false,
    2022: false,
    2021: false,
    2020: false,
  },
}
