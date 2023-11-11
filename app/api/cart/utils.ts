type Merchandise = {
  quantity: number
  id: string
}

export const CREATE_CART_QUERY = `
mutation ($input: CartInput) {
  cartCreate(input: $input) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
  }
}
`

export const UPDATE_LINES_QUERY = `
mutation ($cartId: String!, $lines: [CartLineInput!]) {
  cartLinesUpdate(
    cartId: $cartId
    lines: $lines
  ) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
    }
  }
}
`

export const RETRIEVE_CART_QUERY = `
query ($cartId: String!) {
  cart(id: $cartId) {
    id
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
            }
          }
          attributes {
            key
            value
          }
        }
      }
    }
    attributes {
      key
      value
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity {
      email
      phone
      customer {
        id
      }
      countryCode
      deliveryAddressPreferences {
        ... on MailingAddress {
          address1
          address2
          city
          provinceCode
          countryCodeV2
          zip
        }
      }
    }
  }
}
`
// check this as BuyerIdentity
// {
//   email: "example@example.com"
//   phone: "555-555-555"
//   countryCode: CA
// }

export const UPDATE_CUSTOMER_QUERY = `
mutation ($cartId: String!, $buyerIdentity: BuyerIdentity) {
  cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
    cart {
      id
      buyerIdentity {
        email
        phone
        countryCode
      }
    }
  }
}
`

/**
 * Generates an input object from a list of products.
 * @param lines - List of products id and quantity choosen by customer.
 * @returns An input object that is passed to query to create a cart.
 */
export function generateCreateCartInput(lines: Merchandise[]) {
  return {
    input: {
      lines: generateCartLinesInput(lines),
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

/**
 * Generates a list of products that can be passed as parameter to query.
 * @param lines - List of products id and quantity choosen by customer
 * @returns A list of products(merchandise) that can be passed to query
 */
export function generateCartLinesInput(lines: Merchandise[]) {
  return lines.map(({ id, quantity }) => ({ merchandiseId: id, quantity }))
}
