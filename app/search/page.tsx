'use client'

import DropDown from '@/theme/components/dropdown'
import { TextMid, TextTiny, TextXSmall } from '@/theme/elements/text'
import { MiniProduct } from '@/lib/product'
import { VCard } from '@/theme/components/product/card'
import useSearch from '@/theme/components/useSearch'
import { HR } from '@/theme/elements/rule'
import Accordion from '@/theme/components/accordion'
import CheckBox from '@/theme/components/checkbox'
import Range from '@/theme/components/range'
import Header from '@/theme/components/header'
import { FilterSection } from '@/lib/filter'

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
          <div className='h-fit w-full flex flex-col gap-5 bg-white rounded-xl border border-store-outline-faded-max p-5'>
            <TextMid>Filters</TextMid>
            {loadingFilter ? (
              <div className='flex justify-center items-center w-full'>
                <TextXSmall faded>Loading...</TextXSmall>
              </div>
            ) : (
              <>
                {filter.categories && (
                  <HR>
                    <Accordion title='Categories' defaultOpen>
                      {Object.keys(filter.categories).map((category) => (
                        <CheckBox
                          key={category}
                          check={filter.categories[category]}
                          setCheck={(value: boolean) =>
                            setCategory(value, category)
                          }
                        >
                          {category}
                        </CheckBox>
                      ))}
                    </Accordion>
                  </HR>
                )}
                {filter.colors && (
                  <HR>
                    <Accordion title='Colors' defaultOpen>
                      <div className='grow grid grid-cols-2 gap-x-5 gap-y-3'>
                        {Object.keys(filter.colors).map((color) => (
                          <CheckBox
                            key={color}
                            check={filter.colors[color]}
                            setCheck={(value: boolean) =>
                              setColor(value, color)
                            }
                          >
                            {color}
                          </CheckBox>
                        ))}
                      </div>
                    </Accordion>
                  </HR>
                )}
                {filter.dateAdded && (
                  <HR>
                    <Accordion title='Date Added' defaultOpen>
                      {Object.keys(filter.dateAdded).map((date) => (
                        <CheckBox
                          key={date}
                          check={filter.dateAdded[date]}
                          setCheck={(value: boolean) =>
                            setDateAdded(value, date)
                          }
                        >
                          {date}
                        </CheckBox>
                      ))}
                    </Accordion>
                  </HR>
                )}
                {filter.price.tooMax > 0 && (
                  <Accordion title='Price' defaultOpen>
                    <Range
                      ranges={(() => {
                        const by2 = filter.price.tooMax / 2
                        const by4 = filter.price.tooMax / 4

                        return [
                          [0, by4],
                          [by4, by4 + by4],
                          [by4 + by4, by2 + by4],
                          [by2 + by4, filter.price.tooMax],
                        ]
                      })()}
                      min={filter.price.min}
                      max={filter.price.max}
                      setMin={(value: number) => setPrice(value, 'min')}
                      setMax={(value: number) => setPrice(value, 'max')}
                    />
                  </Accordion>
                )}
              </>
            )}
          </div>
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
                  src={product.src}
                  price={product.price}
                  discount={product.discount}
                  colors={product.colors}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
