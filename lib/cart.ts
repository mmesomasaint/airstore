type CartAttribute = {
  key: string
  value: string
}

export interface Cart {
  id: string
  cartLines: {
    id: string
    quantity: number
    merchandiseId: string
    attributes: CartAttribute[]
  }
  attributes: CartAttribute[]
  cost: {
    totalAmount: number
    subtotalAmount: number
    totalTaxAmount: number
    totalDutyAmount: number
  }
  buyerIdentity: {
    email: string
    phone: string
    customerId: string
    address1: string
    address2: string
    city: string
    zip: string
  }
}