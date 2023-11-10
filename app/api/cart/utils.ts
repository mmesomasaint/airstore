type Merchandise = {
  quantity: number
  merchandisId: string
}

export function generateCreateCartInput(lines: Merchandise[]) {
  return {
    input: {
      lines,
      buyerIdentity: {
        email: 'exampler@example.com',
        countryCode: 'NG',
        deliveryAddressPreferences: {
          deliveryAddress: {
            address1: 'No Example Street',
            address2: '8th Example Floor',
            city: 'Enugu',
            province: 'South-east',
            country: 'NG',
            zip: '41001',
          },
        },
      },
      attributes: {
        key: 'cart_attribute',
        value: 'This is a cart attribute',
      },
    },
  }
}
