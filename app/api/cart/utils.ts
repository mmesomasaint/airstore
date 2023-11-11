type Merchandise = {
  quantity: number
  id: string
}

type CartLine = {
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

interface MiniCartQueryResult {
  id: string
  lines: {
    nodes: CartLine[]
  }
}

interface FullCartQueryResult {
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

export const CREATE_CART_QUERY = `
mutation ($input: CartInput) {
  cartCreate(input: $input) {
    cart {
      id
      lines(first: 10) {
        nodes {
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
        nodes {
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
  }
}
`

export const RETRIEVE_CART_QUERY = `
query ($cartId: String!) {
  cart(id: $cartId) {
    id
    lines(first: 10) {
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

/**
 * Converts lines query results to a cleaner format.
 * @param line List of merchandise gotten from querying for cart
 * @returns A cleaner format that can be used by components
 */
export function cleanCartLinesResult(line: CartLine) {
  const { id, quantity, merchandise, attributes } = line

  return {
    id,
    quantity,
    merchandiseId: merchandise.id,
    attributes,
  }
}

/**
 * Converts cart query result to a cleaner format.
 * @param miniCartResult A result gotten from querying for mini cart
 * @returns A cleaner format of cart that can be used by components
 */
export function cleanMiniCartResult(miniCartResult: MiniCartQueryResult) {
  const { id, lines } = miniCartResult
  const cartLines = lines.nodes.map((node) => cleanCartLinesResult(node))

  return {
    id,
    cartLines,
  }
}

/**
 * Converts full cart query result to a cleaner format.
 * @param fullCartResult A result gotten from querying for full cart
 * @returns A cleaner formart of cart that can be used by components
 */
export function cleanFullCartResult(fullCartResult: FullCartQueryResult) {
  const { id, lines, attributes, cost, buyerIdentity } = fullCartResult
  const cartLines = lines.nodes.map((node) => cleanCartLinesResult(node))

  return {
    id,
    cartLines,
    attributes,
    cost: {
      totalAmount: cost.totalAmount.amount,
      subtotalAmount: cost.subtotalAmount.amount,
      totalTaxAmount: cost.totalTaxAmount.amount,
      totalDutyAmount: cost.totalDutyAmount.amount,
    },
    buyerIdentity: {
      email: buyerIdentity.email,
      phone: buyerIdentity.phone,
      customerId: buyerIdentity.customer.id,
      address1: buyerIdentity.deliveryAddressPreferences.address1,
      address2: buyerIdentity.deliveryAddressPreferences.address2,
      city: buyerIdentity.deliveryAddressPreferences.city,
      zip: buyerIdentity.deliveryAddressPreferences.zip,
    },
  }
}
