import { MiniProduct } from '@/lib/product'
import Header from '@/theme/components/header'
import Loading from '@/theme/components/loading'
import { VCard } from '@/theme/components/product/card'
import useSearch from '@/theme/components/useSearch'
import Button from '@/theme/elements/button'
import { useState } from 'react'

export default function Home() {
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<MiniProduct[]>([])
  const {
    searchText,
    filter,
    categories,
    setSearchText,
    resetCategories,
    setCategory,
    searchHandler,
  } = useSearch()

  const DisplayLoading = () => (loading && products.length <= 0) && <Loading />

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
      <div className='bg-gray-100/70 px-7 py-4 min-h-full grow grid grid-cols-6 gap-9 items-stretch'>
        <DisplayLoading />
        {products.length > 0 && (
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
          )))}
        {hasMore && <Button outlinePrimary>{loading ? 'Loading..' : 'Load More'}</Button>}
      </div>
    </main>
  )
}
