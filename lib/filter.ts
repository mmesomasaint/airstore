export interface Filter {
  categories: {
    [key: string]: boolean
  }
  colors: {
    [key: string]: boolean
  }
  price: {
    min: number
    max: number
    tooMax: number
  }
  dateAdded: {
    [key: string]: boolean
  }
}

export interface CollectionFilter {
  colors: {
    [key: string]: boolean
  }
  price: {
    min: number
    max: number
    tooMax: number
  }
}

export type FilterSection = 'categories' | 'colors' | 'price' | 'dateAdded'

export type Category = 'Airpod' | 'MacBook' | 'Watch' | 'IPad' | 'IPhone' | 'Mac'

export const DefaultFilter: Filter = {
  categories: {
    airpod: false,
    macbook: false,
    iWatch: false,
    iPad: false,
    iPhone: false,
  },
  colors: {
    red: false,
    blue: false,
  },
  price: {
    min: 0,
    max: 0,
    tooMax: 0,
  },
  dateAdded: {
    2023: false,
    2022: false,
    2021: false,
    2020: false,
  },
}

export const DefaultCollectionFilter = {
  colors: {
    blue: false
  },
  price: {
    min: 0,
    max: 0,
    tooMax: 0
  }
}