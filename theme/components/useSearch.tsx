'use client'

import { QueryMiniProduct, cleanMiniProduct } from '@/lib/cleanProduct'
import { cleanFilterQueryResult, generateFilterQuery } from '@/lib/filter'
import { DefaultFilter, Filter, FilterSection } from '@/lib/filter'
import { Product } from '@/lib/temp/products'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function useSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState(query ?? undefined)
  const [searchResults, setSearchResults] = useState<Product[]>([])
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
    setLoading(true)

    await fetch(`/api/search?title=${searchText}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filter: generateFilterQuery(filter) }),
    })
      .then((res) => res.json())
      .then((data) => {
        const cleanedProducts = data.body.map(
          ({ node }: { node: QueryMiniProduct }) => cleanMiniProduct(node)
        )
        setSearchResults(cleanedProducts)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (isSearchPg) {
      getSearchResults()
    }
  }, [isSearchPg])

  useEffect(() => {
    const fetchFilter = async () => {
      await fetch(`/api/getFilters`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFilter(cleanFilterQueryResult(data.body))
        })
    }

    fetchFilter()
  }, [])

  return {
    searchText,
    setSearchText,
    searchResults,
    filter,
    loading,
    categories: useMemo<string[]>(
      () => Object.keys(filter.categories),
      [filter]
    ),
    setCategory: (value: boolean, category: string) => {
      setSectionValue(value, 'categories', category)
    },
    setColor: (value: boolean, color: string) => {
      setSectionValue(value, 'colors', color)
    },
    setDateAdded: (value: boolean, dateAdded: string) => {
      setSectionValue(value, 'dateAdded', dateAdded)
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
