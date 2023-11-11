'use client'

import { InputBarButton } from '@/theme/components/inputBar'
import {
  TextIntro,
  TextLabel,
  TextMid,
  TextTiny,
  TextXSmall,
} from '@/theme/elements/text'
import { HR } from '@/theme/elements/rule'
import { HCard } from '@/theme/components/product/card'
import { BsBox2Heart } from 'react-icons/bs'
import { LuPackageCheck } from 'react-icons/lu'
import { IoIosArrowForward } from 'react-icons/io'
import { OutlineButton } from '@/theme/components/outline-btns'
import Button from '@/theme/elements/button'
import useSearch from '@/theme/components/useSearch'
import Header from '@/theme/components/header'
import { useCart } from '../cart'

export default function Checkout() {
  const { cartId } = useCart()
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
          <span className='flex justify-start items-center gap-5'>
            <TextTiny faded>Home</TextTiny>
            <TextTiny faded>
              <IoIosArrowForward className='text-base' />
            </TextTiny>
            <TextTiny faded>Cart</TextTiny>
          </span>
        </div>
        <div className='grow grid grid-cols-[repeat(14,_minmax(0,_1fr))] gap-5 place-items-start'>
          <div className='col-span-11 w-full'>
            <TextIntro faded copy>
              Your Items &amp; Shipment
            </TextIntro>
            <div className='h-fit w-full flex flex-col mt-4 gap-6 bg-white rounded-xl border border-store-outline-faded-max p-5'>
              <HR>
                <HCard
                  src='/imgs/macbook-pro-fv-1.webp'
                  title={`Apple Macbook Pro 14'' 2022 | M2 Max Chip`}
                  amount={2}
                  variants={[
                    'Gray',
                    '16GB RAM, 16 Core GPU Apple M2 Pro Chip',
                    '512GB',
                  ]}
                  note='Please send quickly'
                  price={2690.16}
                />
              </HR>
              <div className='flex flex-col gap-4'>
                <div className='flex justify-between items-center gap-4'>
                  <TextIntro faded>Delivery Information</TextIntro>
                  <Button outlinePrimary>Edit Address</Button>
                </div>
                <div className='flex justify-start items-center gap-3'>
                  <div className='w-20 h-20 rounded-2xl border border-store-outline-faded-max' />
                  <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                      <TextXSmall>Bayu Onyedike</TextXSmall>
                      <TextTiny fadedMax>0805332803</TextTiny>
                    </div>
                    <div className='flex flex-col gap-1'>
                      <TextTiny fadedMax>
                        No 1709, lockestreet avenue nwanghabu
                      </TextTiny>
                      <TextTiny fadedMax>Port Harcourt</TextTiny>
                    </div>
                  </div>
                </div>
                <div className='flex justify-start items-center gap-4'>
                  <div className='flex items-center gap-2'>
                    <LuPackageCheck className='text-base text-store-faded-max' />
                    <TextTiny fadedMax>Estimated Delivery in 3 days</TextTiny>
                  </div>
                  <TextLabel fadedMax>|</TextLabel>
                  <div className='flex items-center gap-2'>
                    <BsBox2Heart className='text-base text-store-faded-max' />
                    <TextTiny fadedMax>Free shipping insurance</TextTiny>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-3 h-fit w-full flex flex-col gap-6 bg-white rounded-xl border border-store-outline-faded-max p-5'>
            <HR>
              <div className='flex flex-col gap-3'>
                <TextXSmall>Get Promo</TextXSmall>
                <InputBarButton>Apply</InputBarButton>
              </div>
            </HR>
            <HR>
              <div className='flex flex-col gap-3'>
                <TextXSmall>Payment Method</TextXSmall>
                <div className='flex flex-wrap gap-1'>
                  <OutlineButton>GPay</OutlineButton>
                  <OutlineButton>GoPay</OutlineButton>
                  <OutlineButton>Visa</OutlineButton>
                </div>
              </div>
            </HR>
            <div className='flex flex-col gap-6'>
              <HR dashed>
                <div className='flex flex-col gap-2'>
                  <div className='flex justify-between items-center gap-2'>
                    <TextTiny faded>Sum Total</TextTiny>
                    <TextXSmall>$2,690.16</TextXSmall>
                  </div>
                  <div className='flex justify-between items-center gap-2'>
                    <TextTiny faded>Shipping Cost</TextTiny>
                    <TextXSmall>$25</TextXSmall>
                  </div>
                  <div className='flex justify-between items-center gap-2'>
                    <TextTiny faded>Tax(10%)</TextTiny>
                    <TextXSmall>$538.3</TextXSmall>
                  </div>
                </div>
              </HR>
              <div className='flex flex-col gap-3'>
                <div className='flex justify-between items-center gap-2'>
                  <TextXSmall faded>Total</TextXSmall>
                  <TextMid>$3,252.19</TextMid>
                </div>
                <Button fillPrimary>Pay Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
