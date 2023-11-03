'use client'

import DropDown from '@/theme/components/dropdown'
import Filter from '@/theme/components/filter'
import { TextMid, TextTiny, TextXSmall } from '@/theme/elements/text'
import { MiniProduct } from '@/lib/product'
import { VCard } from '@/theme/components/product/card'
import useSearch from '@/theme/components/useSearch'
import { HR } from '@/theme/elements/rule'
import Accordion from '@/theme/components/accordion'
import CheckBox from '@/theme/components/checkbox'
import Range from '@/theme/components/range'
import Header from '@/theme/components/header'

export default function Home() {
  const {
    searchText,
    searchedText,
    searchResults,
    filter,
    categories,
    loading,
    loadingFilter,
    setSearchText,
    searchHandler,
    resetCategories,
    setCategory,
    setColor,
    setDateAdded,
    setPrice,
  } = useSearch()

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
      <div className='bg-gray-100/70 px-7 py-4 min-h-full grow grid grid-cols-12 gap-5 place-items-start'>
        <div className='col-span-3 h-fit w-full'>
          <Filter filter={filter} pending={loadingFilter} setCategory={setCategory} setPrice={setPrice} setColor={setColor} setDateAdded={setDateAdded} />
        </div>
        <div className='col-span-9 gap-5 flex flex-col w-full'>
          <div className='flex justify-between items-center gap-10'>
            <span className='flex justify-start items-center gap-1'>
              <TextTiny>Showing 1-60 items out of a total of 1.2k for</TextTiny>
              <TextTiny primary>"{searchedText}"</TextTiny>
            </span>
            <div className='flex justify-end items-center gap-3'>
              <TextTiny>Sort by:</TextTiny>
              <DropDown
                selected={'Popular'}
                items={['Popular', 'Price', 'Latest', 'Favorite']}
                full
              />
            </div>
          </div>
          <div className='grid grid-cols-4 items-stretch gap-9'>
            {loading ? (
              <div className='col-span-full place-self-stretch flex justify-center items-center h-full w-full'>
                <TextXSmall faded>Loading...</TextXSmall>
              </div>
            ) : (
              searchResults.map((product: MiniProduct, id) => (
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
    </main>
  )
}
