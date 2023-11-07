'use client'

import DropDown from '@/theme/components/dropdown'
import Filter from '@/theme/components/filter'
import { TextTiny, TextXSmall } from '@/theme/elements/text'
import { MiniProduct } from '@/lib/product'
import { VCard } from '@/theme/components/product/card'
import useSearch from '@/theme/components/useSearch'
import Header from '@/theme/components/header'
import Loading from '@/theme/components/loading'

export default function Home() {
  const {
    searchText,
    searchedText,
    searchResults,
    filter,
    hasFilterError,
    hasSearchError,
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

  const DisplayProducts = () => searchResults.length > 0 ? (
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
  ) : (
    <div className='col-span-full flex justify-center items-center'>
      <TextXSmall faded>
        {hasSearchError ? 'An error occured' : "No products found."}
      </TextXSmall>
    </div>
  )

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
          <Filter
            filter={filter}
            pending={loadingFilter}
            hasError={hasFilterError}
            setCategory={setCategory}
            setPrice={setPrice}
            setColor={setColor}
            setDateAdded={setDateAdded}
          />
        </div>
        <div className='col-span-9 gap-5 flex flex-col w-full'>
          <div className='flex justify-between items-center gap-10'>
            <span className='flex justify-start items-center gap-1'>
              <TextTiny>Showing {searchResults.length} items for</TextTiny>
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
              <Loading />
            ) : <DisplayProducts />}
          </div>
        </div>
      </div>
    </main>
  )
}
