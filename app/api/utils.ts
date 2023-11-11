import { CollectionFilter, Filter } from '@/lib/filter'

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

/**
 * Generates a filter that can be passed as query.
 * @param filter The filter object used by collection page
 * @returns A filter that can be passed to query
 */
export function generateFilters(filter: CollectionFilter) {
  const activeColors = Object.keys(filter.colors).filter(
    (color) => filter.colors[color]
  )
  const hasActiveColor = activeColors.length > 0
  let filters = Array()

  // Create a color filter, when atleast one color is selected for filtering
  if (hasActiveColor) {
    const colorFilters = activeColors.map((color) => ({
      variantOption: { name: 'Color', value: color },
    }))
    filters = [...filters, ...colorFilters]
  }

  // Create a price filter when there is a max value
  if (filter.price.max > 0) {
    const priceFilter = {
      price: { min: filter.price.min, max: filter.price.max },
    }
    filters = [...filters, priceFilter]
  }

  return filters
}

/**
 * Converts a query result to a clean filter
 * @param priceRange The priceRange field from the product query
 * @param options The options field from the product query
 * @returns A cleaner filter that can be used by collection page
 */
export function convertToFilter({
  priceRange,
  options,
}: {
  priceRange: { minVariantPrice: { amount: string } }
  options: { name: string; values: string[] }[]
}) {
  const {
    minVariantPrice: { amount: price },
  } = priceRange

  let colors = Array()
  // Only options with name `Color` are allowed in colors list.
  options
    .filter((option) => option.name === 'Color')
    .forEach((option) => colors.push(...option.values))

  return {
    price,
    colors,
  }
}

/**
 * Cleans up filter query result
 * @param queryResult The result gotten from the filter query
 * @returns A more cleaner version that can be used by components
 */
export const cleanFilterQueryResult = (
  queryResult: FilterQueryResult
): Filter => {
  const { nodes: productNodes } = queryResult
  return productNodes.reduce(
    (acc, cur) => {
      const removeDup = (list: any[]) => Array.from(new Set(list))
      const toDefault = (list: any[]) =>
        list.reduce((acc, cur) => ({ ...acc, [cur]: false }), {})
      const {
        options,
        priceRange,
        createdAt,
        collections: { nodes: collectionNodes },
      } = cur
      const categoryTitles = [
        'Airpod',
        'MacBook',
        'IPhone',
        'Watch',
        'IPad',
        'Mac',
      ]
      const categories = collectionNodes.map((node) => {
        const title = node.title
        const idx = categoryTitles.findIndex((categoryTitle) =>
          title.includes(categoryTitle)
        )
        if (idx !== -1) return categoryTitles[idx]
      })
      let colors = Array()

      options
        .filter((option) => option.name === 'Color')
        .forEach((option) => colors.push(...option.values))

      return {
        colors: toDefault(removeDup([...Object.keys(acc.colors), ...colors])),
        dateAdded: toDefault(
          removeDup([
            ...Object.keys(acc.dateAdded),
            new Date(createdAt).getFullYear(),
          ])
        ),
        price: {
          min: 0,
          max: 0,
          tooMax: Math.max(
            parseInt(priceRange.minVariantPrice.amount),
            acc.price.tooMax
          ),
        },
        categories: toDefault(
          removeDup([...Object.keys(acc.categories), ...categories])
        ),
      }
    },
    {
      colors: {},
      dateAdded: {},
      price: { min: 0, max: 0, tooMax: 0 },
      categories: {},
    }
  )
}

/**
 * Converts a product containing majorly a variant result to a variant type.
 * @param product - The product containing the varaint to convert.
 * @returns variant - A variant type
 */
export function cleanProductToVariant(product: VariantByOptionsResult) {
  return {
    ...cleanProductVariant(product.variantBySelectedOptions),
    productHandle: product.handle,
  }
}

export function cleanProductVariant(variant: Variant) {
  return {
    id: variant.id,
    sku: variant.sku,
    price: variant.price ? Number(variant.price.amount) : null,
    discount: variant.compareAtPrice
      ? Number(variant.compareAtPrice.amount)
      : null,
    quantityAvailable: variant.quantityAvailable,
  }
}

/**
 * Cleans up a product returned from query.
 * @param product A full product result from querying shopify for a product.
 * @returns A cleaner version of the returned product that can be used by components
 */
export function cleanProduct(product: FullProductQueryResult) {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    descriptionHtml: product.descriptionHtml,
    images: product.images.nodes,
    options: product.options,
    price: product.priceRange
      ? Number(product.priceRange.minVariantPrice.amount)
      : null,
    discount: product.compareAtPriceRange
      ? Number(product.compareAtPriceRange.maxVariantPrice.amount)
      : null,
  }
}

/**
 * Generates a query usable filter from raw object.
 * @param filter The raw filter object from the user
 * @returns A filter that can be used by the query
 */
export const generateFilterQuery = (filter: Filter) => {
  const { categories, price, colors, dateAdded } = filter
  const activeDateAdded = Object.keys(dateAdded).filter((key) => dateAdded[key])
  const priceMaxQuery = ` AND variants.price:<=${price.max}`

  return {
    categories: Object.keys(categories).filter((key) => categories[key]),
    colors: Object.keys(colors).filter((key) => colors[key]),
    price: `(variants.price:>=${price.min}${
      price.max > 0 ? priceMaxQuery : ''
    })`,
    dateAdded:
      activeDateAdded.length > 0 && `(created_at:>${activeDateAdded[0]})`,
  }
}

/**
 * Cleans up the filter query results
 * @param queryResult The result of passing the filter query
 * @returns A cleaner version of the query result that can be used by components
 */
export const cleanFilterQueryResult = (
  queryResult: FilterQueryResult
): Filter => {
  const { nodes: productNodes } = queryResult
  return productNodes.reduce(
    (acc, cur) => {
      const removeDup = (list: any[]) => Array.from(new Set(list))
      const toDefault = (list: any[]) =>
        list.reduce((acc, cur) => ({ ...acc, [cur]: false }), {})
      const {
        options,
        priceRange,
        createdAt,
        collections: { nodes: collectionNodes },
      } = cur
      const categoryTitles = [
        'Airpod',
        'MacBook',
        'IPhone',
        'Watch',
        'IPad',
        'Mac',
      ]
      const categories = collectionNodes.map((node) => {
        const title = node.title
        const idx = categoryTitles.findIndex((categoryTitle) =>
          title.includes(categoryTitle)
        )
        if (idx !== -1) return categoryTitles[idx]
      })
      let colors = Array()

      options
        .filter((option) => option.name === 'Color')
        .forEach((option) => colors.push(...option.values))

      return {
        colors: toDefault(removeDup([...Object.keys(acc.colors), ...colors])),
        dateAdded: toDefault(
          removeDup([
            ...Object.keys(acc.dateAdded),
            new Date(createdAt).getFullYear(),
          ])
        ),
        price: {
          min: 0,
          max: 0,
          tooMax: Math.max(
            parseInt(priceRange.minVariantPrice.amount),
            acc.price.tooMax
          ),
        },
        categories: toDefault(
          removeDup([...Object.keys(acc.categories), ...categories])
        ),
      }
    },
    {
      colors: {},
      dateAdded: {},
      price: { min: 0, max: 0, tooMax: 0 },
      categories: {},
    }
  )
}

/**
 * Cleans up the query result of mini product
 * @param queryResult The result of fetching the mini product query.
 * @returns A cleaner version of mini product that can be used by components
 */
export function cleanMiniProduct(queryResult: MiniProductQueryResult) {
  const {
    id,
    title,
    handle,
    featuredImage,
    priceRange,
    compareAtPriceRange,
    options,
    collections,
  } = queryResult
  const { url } = featuredImage
  const { minVariantPrice } = priceRange
  const { maxVariantPrice } = compareAtPriceRange
  const collectionHandles = collections.nodes.map((node) => node.handle)

  let colors = Array()
  options
    .filter((option) => option.name === 'Color')
    .forEach((option) => colors.push(...option.values))

  return {
    id,
    title,
    handle,
    colors,
    src: url,
    price: parseInt(minVariantPrice.amount),
    discount: parseInt(maxVariantPrice.amount),
    collectionHandle: collectionHandles[0],
  }
}
