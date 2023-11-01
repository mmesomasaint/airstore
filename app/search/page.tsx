'use client'

import DropDown from '@/theme/components/dropdown'
import { TextMid, TextTiny, TextXSmall } from '@/theme/elements/text'
import { Product } from '@/lib/temp/products'
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
    searchResults,
    filter,
    categories,
    loading,
    setSearchText,
    searchHandler,
    resetCategories,
    setCategory,
    setCondition,
    setPaymentGateway,
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
            <HR>
              <Accordion title='Categories' defaultOpen>
                <CheckBox
                  check={filter.categories.airpod}
                  setCheck={(value: boolean) => setCategory(value, 'airpod')}
                >
                  Airpods
                </CheckBox>
                <CheckBox
                  check={filter.categories.iPhone}
                  setCheck={(value: boolean) => setCategory(value, 'iPhone')}
                >
                  iPhone
                </CheckBox>
                <CheckBox
                  check={filter.categories.iPad}
                  setCheck={(value: boolean) => setCategory(value, 'iPad')}
                >
                  iPad
                </CheckBox>
                <CheckBox
                  check={filter.categories.macbook}
                  setCheck={(value: boolean) => setCategory(value, 'macbook')}
                >
                  Macbook
                </CheckBox>
                <CheckBox
                  check={filter.categories.iWatch}
                  setCheck={(value: boolean) => setCategory(value, 'iWatch')}
                >
                  iWatch
                </CheckBox>
              </Accordion>
            </HR>
            <HR>
              <Accordion title='Condition'>
                <CheckBox
                  check={filter.conditions.newStuff}
                  setCheck={(value: boolean) => setCondition(value, 'newStuff')}
                >
                  New Stuff
                </CheckBox>
                <CheckBox
                  check={filter.conditions.fairlyUsed}
                  setCheck={(value: boolean) =>
                    setCondition(value, 'fairlyUsed')
                  }
                >
                  Fairly Used
                </CheckBox>
                <CheckBox
                  check={filter.conditions.secondHand}
                  setCheck={(value: boolean) =>
                    setCondition(value, 'secondHand')
                  }
                >
                  Second Hand
                </CheckBox>
              </Accordion>
            </HR>
            <HR>
              <Accordion title='Price'>
                <Range
                  ranges={[
                    [500, 1000],
                    [1000, 1500],
                    [1500, 2000],
                    [2000, 2500],
                    [2500, 3000],
                  ]}
                  min={filter.price.min}
                  max={filter.price.max}
                  setMin={(value: number) => setPrice(value, 'min')}
                  setMax={(value: number) => setPrice(value, 'max')}
                />
              </Accordion>
            </HR>
            <Accordion title='Payment' defaultOpen>
              <CheckBox
                check={filter.paymentGateways.cashOnDelivery}
                setCheck={(value: boolean) =>
                  setPaymentGateway(value, 'cashOnDelivery')
                }
              >
                Cash on Delivery
              </CheckBox>
              <CheckBox
                check={filter.paymentGateways.prepaid}
                setCheck={(value: boolean) =>
                  setPaymentGateway(value, 'prepaid')
                }
              >
                Prepaid
              </CheckBox>
              <CheckBox
                check={filter.paymentGateways.iStoreCoupon}
                setCheck={(value: boolean) =>
                  setPaymentGateway(value, 'iStoreCoupon')
                }
              >
                iStore Coupon
              </CheckBox>
              <CheckBox
                check={filter.paymentGateways.binancePay}
                setCheck={(value: boolean) =>
                  setPaymentGateway(value, 'binancePay')
                }
              >
                Binance Pay
              </CheckBox>
            </Accordion>
          </div>
        </div>
        <div className='col-span-9 gap-5 flex flex-col w-full'>
          <div className='flex justify-between items-center gap-10'>
            <span className='flex justify-start items-center gap-1'>
              <TextTiny>Showing 1-60 items out of a total of 1.2k for</TextTiny>
              <TextTiny primary>"{searchText}"</TextTiny>
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
          <div className='grid grid-cols-4 items-stretch gap-5'>
            {loading ? (<div className='col-span-full place-self-stretch flex justify-center items-center h-full w-full'><TextXSmall faded>Loading...</TextXSmall></div>) : searchResults.map((product: Product, id) => (
              <VCard
                key={`${product.src + id}`}
                title={product.title}
                src={product.src}
                price={product.price}
                discount={product.discount}
                colors={product.colors}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
