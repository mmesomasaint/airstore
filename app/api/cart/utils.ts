type Merchandise = {
  quantity: number
  merchandisId: string
}

export const CREATE_CART_QUERY = `
mutation {
  cartCreate(
    input: {
      lines: [
        {
          quantity: 1
          merchandiseId: "gid://shopify/ProductVariant/1"
        }
      ],
      # The information about the buyer that's interacting with the cart.
      buyerIdentity: {
        email: "example@example.com",
        countryCode: CA,
        # An ordered set of delivery addresses associated with the buyer that's interacting with the cart. The rank of the preferences is determined by the order of the addresses in the array. You can use preferences to populate relevant fields in the checkout flow.
        deliveryAddressPreferences: {
          deliveryAddress: {
            address1: "150 Elgin Street",
            address2: "8th Floor",
            city: "Ottawa",
            province: "Ontario",
            country: "CA",
            zip: "K2P 1L4"
          },
        }
      }
      attributes: {
        key: "cart_attribute",
        value: "This is a cart attribute"
      }
    }
  ) {
    cart {
      id
      createdAt
      updatedAt
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
      buyerIdentity {
        deliveryAddressPreferences {
          __typename
        }
      }
      attributes {
        key
        value
      }
      # The estimated total cost of all merchandise that the customer will pay at checkout.
      cost {
        totalAmount {
          amount
          currencyCode
        }
        # The estimated amount, before taxes and discounts, for the customer to pay at checkout.
        subtotalAmount {
          amount
          currencyCode
        }
        # The estimated tax amount for the customer to pay at checkout.
        totalTaxAmount {
          amount
          currencyCode
        }
        # The estimated duty amount for the customer to pay at checkout.
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}
`

export const UPDATE_LINES_QUERY = `
mutation {
  cartLinesUpdate(
    cartId: "gid://shopify/Cart/1"
    lines: {
      id: "gid://shopify/CartLine/1"
      quantity: 3
    }
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
    }
  }
}
`

export const RETRIEVE_CART_QUERY = `
query {
  cart(
    id: "gid://shopify/Cart/1"
  ) {
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

export const UPDATE_CUSTOMER_QUERY = `
mutation {
  cartBuyerIdentityUpdate(
    cartId: "gid://shopify/Cart/1"
    buyerIdentity: {
      email: "example@example.com"
      phone: "555-555-555"
      countryCode: CA
    }
  ) {
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
