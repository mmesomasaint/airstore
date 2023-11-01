'use client'

import { QueryMiniProduct, cleanMiniProduct } from '@/lib/cleanProduct'
import { DefaultFilter, Filter, FilterSection } from '@/lib/temp/filter'
import { Product, products } from '@/lib/temp/products'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type SearchFilter = {
  searchText: string | undefined
  setSearchText: (value: string) => void
  searchResults: Product[]
  filter: Filter
  categories: string[]
  setCategory: (value: boolean, category: string) => void
  setCondition: (value: boolean, condition: string) => void
  setPaymentGateway: (value: boolean, paymentGateway: string) => void
  setPrice: (value: number, price: string) => void
  resetCategories: () => void
  searchHandler: () => void
}

export default function useSearch(): SearchFilter {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [searchText, setSearchText] = useState(query ?? undefined)
  const [searchResults, setSearchResults] = useState<Product[]>(products)
  const [filter, setFilter] = useState<Filter>(DefaultFilter)
  const isSearchPg = pathname === '/search'

  const setSectionValue = (
    value: boolean | number,
    section: FilterSection,
    id: string
  ) => {
    setFilter((prev) => ({
      ...prev,
      [section]: { ...prev[section], [id]: value },
    }))
  }

  const getSearchResults = async () => {
    await fetch(`/api/search?title=${searchText}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filter }),
    })
      .then((res) => res.json())
      .then((data) => {
        const cleanedProducts = data.body.map(
          ({ node }: { node: QueryMiniProduct }) => cleanMiniProduct(node)
        )
        setSearchResults(cleanedProducts)
      })
  }

  useEffect(() => {
    if (isSearchPg) {
      getSearchResults()
    }
  }, [isSearchPg])

  return {
    searchText,
    setSearchText,
    searchResults,
    filter,
    categories: useMemo<string[]>(
      () => Object.keys(filter.categories),
      [filter]
    ),
    setCategory: (value: boolean, category: string) => {
      setSectionValue(value, 'categories', category)
    },
    setCondition: (value: boolean, condition: string) => {
      setSectionValue(value, 'conditions', condition)
    },
    setPaymentGateway: (value: boolean, paymentGateway: string) => {
      setSectionValue(value, 'paymentGateways', paymentGateway)
    },
    setPrice: (value: number, price: string) => {
      setSectionValue(value, 'price', price)
    },
    resetCategories: () => {
      setFilter((prev) => ({
        ...prev,
        categories: DefaultFilter.categories,
      }))
    },
    searchHandler: () => {
      if (isSearchPg) {
        router.push(`/search?q=${searchText}`)
        getSearchResults()
        return
      }

      // Go to the search page if not already there.
      router.push(`/search?q=${searchText}`)
    },
  }
}
