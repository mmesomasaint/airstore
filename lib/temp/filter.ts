export interface Filter {
  categories: {
    airpod: boolean
    macbook: boolean
    iWatch: boolean
    iPad: boolean
    iPhone: boolean
  }
  conditions: {
    newStuff: boolean
    fairlyUsed: boolean
    secondHand: boolean
  }
  price: {
    min: number
    max: number
  }
  paymentGateways: {
    cashOnDelivery: boolean
    prepaid: boolean
    iStoreCoupon: boolean
    binancePay: boolean
  }
}

export type FilterSection =
  | 'categories'
  | 'conditions'
  | 'price'
  | 'paymentGateways'

export type Category = 'airpod' | 'macbook' | 'iWatch' | 'iPad' | 'iPhone'

export const DefaultFilter: Filter = {
  categories: {
    airpod: false,
    macbook: false,
    iWatch: false,
    iPad: false,
    iPhone: false,
  },
  conditions: {
    newStuff: false,
    fairlyUsed: false,
    secondHand: false,
  },
  price: {
    min: 0,
    max: 0,
  },
  paymentGateways: {
    cashOnDelivery: false,
    prepaid: false,
    iStoreCoupon: false,
    binancePay: false,
  },
}
