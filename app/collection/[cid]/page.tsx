'use client'

import { IoIosArrowForward } from 'react-icons/io'
import { TextTiny } from '@/theme/elements/text'
import Header from '@/theme/components/header'
import useSearch from '@/theme/components/useSearch'

export default function Home() {
  const {
    searchText,
    filter,
    categories,
    setSearchText,
    resetCategories,
    setCategory,
    searchHandler,
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
      <div className='bg-gray-100/70 px-7 py-4 min-h-full grow gap-5 flex flex-col w-full'>
        <div className='flex justify-between items-center gap-10'>
          <span className='flex justify-start items-center gap-10'>
            <TextTiny faded>Home</TextTiny>
            <TextTiny faded>
              <IoIosArrowForward className='text-base' />
            </TextTiny>
            <TextTiny>Macbook</TextTiny>
          </span>
        </div>
      </div>
    </main>
  )
}
