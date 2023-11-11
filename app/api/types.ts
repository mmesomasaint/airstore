export type Merchandise = {
  quantity: number
  id: string
}

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
  }
  attributes: {
    key: string
    value: string
  }[]
}

export interface MiniCartQueryResult {
  id: string
  lines: {
    nodes: CartLine[]
  }
}

export interface FullCartQueryResult {
  id: string
  lines: {
    nodes: CartLine[]
  }
  attributes: {
    key: string
    value: string
  }[]
  cost: {
    totalAmount: {
      amount: number
      currencyCode: string
    }
    subtotalAmount: {
      amount: number
      currencyCode: string
    }
    totalTaxAmount: {
      amount: number
      currencyCode: string
    }
    totalDutyAmount: {
      amount: number
      currencyCode: string
    }
  }
  buyerIdentity: {
    email: string
    phone: string
    customer: {
      id: string
    }
    countryCode: string
    deliveryAddressPreferences: {
      address1: string
      address2: string
      city: string
      provinceCode: string
      countryCodeV2: string
      zip: string
    }
  }
}