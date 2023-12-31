'use client'

import { DefaultFilter } from '@/lib/filter'
import { Filter, FilterSection } from '@/lib/filter'
import { MiniProduct } from '@/lib/product'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function useSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [loading, setLoading] = useState(true)
  const [loadingFilter, setLoadingFilter] = useState(true)
  const [searchText, setSearchText] = useState(query ?? undefined)
  const [searchedText, setSearchedText] = useState(searchText)
  const [searchResults, setSearchResults] = useState<MiniProduct[]>([])
  const [hasFilterError, setHasFilterError] = useState(false)
  const [hasSearchError, setHasSearchError] = useState(false)
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
    setHasSearchError(false)

    await fetch(`/api/search?title=${searchText}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filter }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.body)
        setSearchedText(searchText)
      })
      .catch((e) => setHasSearchError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (isSearchPg) {
      getSearchResults()
    }
  }, [isSearchPg, filter])

  useEffect(() => {
    setLoadingFilter(true)
    setHasFilterError(false)

    const fetchFilter = async () => {
      await fetch(`/api/get/filters`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => setFilter(data.body))
        .catch((e) => setHasFilterError(true))
        .finally(() => setLoadingFilter(false))
    }

    fetchFilter()
  }, [])

  return {
    searchText,
    searchedText,
    setSearchText,
    searchResults,
    filter,
    hasFilterError,
    hasSearchError,
    loading,
    loadingFilter,
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
      setFilter((prev) => {
        const newFilter = { ...prev }
        Object.keys(newFilter.categories).forEach(
          (key) => (newFilter.categories[key] = false)
        )
        return newFilter
      })
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
