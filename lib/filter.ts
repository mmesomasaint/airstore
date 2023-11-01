export interface Filter {
  categories: {
    [key: string]: boolean
  }
  color: {
    [key: string]: boolean
  }
  price: {
    min: number
    max: number
  }
  dateAdded: {
    [key: string]: boolean
  }
}

export type FilterSection = 'categories' | 'color' | 'price' | 'dateAdded'

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
    blue: false,
  },
  price: {
    min: 0,
    max: 0,
  },
  dateAdded: {
    2023: false,
    2022: false,
    2021: false,
    2020: false,
  },
}

const generateActiveFiltersQuery = (filter: Filter) => {
  const {categories, price, color, dateAdded} = filter
  const activeDateAdded = Object.keys(dateAdded).filter(key => dateAdded[key])
  const activePrice = [price.min, price.max]

  return {
    categories: Object.keys(categories).filter(key => categories[key]),
    color: Object.keys(color).filter(key => color[key]),
    price: `variants.price:>=${price.min}${price.max && ` AND variants.price:<=${price.max}`}`,
    dateAdded: `created_at:>${activeDateAdded[0]}`,
  }
}