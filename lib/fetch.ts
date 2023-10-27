export async function shopifyFetch({
  query,
  variables,
}: {
  query: string
  variables: string
}) {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN

  try {
    if (endpoint && key) {
      const result = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': key,
        },
        body: { query, variables } && JSON.stringify({ query, variables }),
      })

      return {
        status: result.status,
        body: await result.json(),
      }
    } else throw new Error('Endpoint or key is undefined')
  } catch (error) {
    console.error('Error:', error)
    return {
      status: 500,
      error: 'Error receiving data',
    }
  }
}
