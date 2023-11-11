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

export interface CollectionFilterQueryResult {
  products: {
    nodes: {
      priceRange: {
        minVariantPrice: {
          amount: string
        }
      }
      options: {
        name: string
        values: string[]
      }[]
    }[]
  }
}

export interface FilterQueryResult {
  nodes: {
    id: string
    createdAt: string
    options: {
      name: string
      values: string[]
    }[]
    priceRange: {
      minVariantPrice: {
        amount: string
      }
    }
    collections: {
      nodes: {
        title: string
      }[]
    }
  }[]
}

export interface MiniProductQueryResult {
  id: string
  title: string
  handle: string
  totalInventory: number
  featuredImage: {
    url: string
  }
  priceRange: {
    minVariantPrice: {
      amount: string
    }
  }
  compareAtPriceRange: {
    maxVariantPrice: {
      amount: string
    }
  }
  options: {
    name: string
    values: string[]
  }[]
  collections: {
    nodes: {
      handle: string
      title: string
    }[]
  }
}