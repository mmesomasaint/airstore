export function generateCartInput() {
  return {
    input: {
      attributes: [
        {
          key: '',
          value: '',
        },
      ],
      buyerIdentity: {
        countryCode: '',
        customerAccessToken: '',
        deliveryAddressPreferences: [
          {
            customerAddressId: '',
            deliveryAddress: {
              address1: '',
              address2: '',
              city: '',
              company: '',
              country: '',
              firstName: '',
              lastName: '',
              phone: '',
              province: '',
              zip: '',
            },
          },
        ],
        email: '',
        phone: '',
        walletPreferences: [''],
      },
      discountCodes: [''],
      lines: [
        {
          attributes: [
            {
              key: '',
              value: '',
            },
          ],
          merchandiseId: '',
          quantity: 1,
          sellingPlanId: '',
        },
      ],
      metafields: [
        {
          key: '',
          type: '',
          value: '',
        },
      ],
      note: '',
    },
  }
}
