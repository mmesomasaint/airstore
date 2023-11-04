'use client'

import { IoIosArrowForward } from 'react-icons/io'
import { TextTiny, TextXSmall } from '@/theme/elements/text'
import Header from '@/theme/components/header'
import useSearch from '@/theme/components/useSearch'
import { useEffect, useState } from 'react'
import { CollectionFilter, DefaultCollectionFilter } from '@/lib/filter'
import { useParams } from 'next/navigation'
import DropDown from '@/theme/components/dropdown'
import { CollectionFilterer } from '@/theme/components/filter'
import { MiniProduct } from '@/lib/product'
import { VCard } from '@/theme/components/product/card'

export default function Home() {
  const { cid } = useParams()
  const [loadingColFilter, setLoadingColFilter] = useState(true)
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [products, setProducts] = useState([])
  const [collectionFilter, setCollectionFilter] = useState<CollectionFilter>(
    DefaultCollectionFilter
  )
  const {
    searchText,
    filter,
    categories,
    setSearchText,
    resetCategories,
    setCategory,
    searchHandler,
  } = useSearch()

  // Setters
  const setSectionValue = (
    value: boolean | number,
    section: 'colors' | 'price',
    id: string
  ) => {
    setCollectionFilter((prev) => ({
      ...prev,
      [section]: { ...prev[section], [id]: value },
    }))
  }

  const setColor = (value: boolean, color: string) => {
    setSectionValue(value, 'colors', color)
  }

  const setPrice = (value: number, price: string) => {
    setSectionValue(value, 'price', price)
  }

  useEffect(() => {
    setLoadingProducts(true)

    fetch(`/api/getFilters/collection?handle=${cid.toString()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collectionFilter }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.body?.products)
        setLoadingProducts(false)
      })
  }, [collectionFilter])

  useEffect(() => {
    setLoadingColFilter(true)

    fetch(`/api/getFilters/collection?handle=${cid.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCollectionFilter(data.body)
        setLoadingColFilter(false)
      })
  }, [])

  return (
    <main className='min-h-screen flex flex-col'>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        filter={filter}
        categories={categories}
        resetCategories={resetCategories}
        setCategory={setCategory}
        searchClick={searchHandler}
      />
      <div className='bg-gray-100/70 px-7 py-4 min-h-full grow gap-5 flex flex-col w-full'>
        <div className='flex justify-between items-center gap-10'>
          <span className='flex justify-start items-center gap-5'>
            <TextTiny faded>Home</TextTiny>
            <TextTiny faded>
              <IoIosArrowForward className='text-base' />
            </TextTiny>
            <TextTiny>
              <span className='capitalize'>
                {cid.toString().split('-').join(' ')}
              </span>
            </TextTiny>
          </span>
          <div className='flex items-center justify-end gap-3'>
            <TextTiny>Sort by:</TextTiny>
            <DropDown
              selected={'Popular'}
              items={['Popular', 'Price', 'Latest', 'Favorite']}
              full
            />
          </div>
        </div>
        <div className='grid grid-cols-12 gap-5 place-items-start'>
          <div className='col-span-3 h-fit w-full'>
            <CollectionFilterer
              filter={collectionFilter}
              pending={loadingColFilter}
              setColor={setColor}
              setPrice={setPrice}
            />
          </div>
          <div className='col-span-9 gap-5 flex flex-col w-full'>
            <div className='grid grid-cols-4 items-stretch gap-9'>
              {loadingProducts ? (
                <div className='col-span-full place-self-stretch flex justify-center items-center h-full w-full'>
                  <TextXSmall faded>Loading...</TextXSmall>
                </div>
              ) : (
                products.map((product: MiniProduct, id) => (
                  <VCard
                    key={`${product.src + id}`}
                    title={product.title}
                    handle={product.handle}
                    src={product.src}
                    price={product.price}
                    discount={product.discount}
                    colors={product.colors}
                    collectionHandle={product.collectionHandle}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
