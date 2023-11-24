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
import { useEffect, useState } from 'react'
import { Cart } from '@/lib/cart'

export default function Checkout() {
  const { cartId } = useCart()
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState<Cart>()
  const {
    searchText,
    filter,
    categories,
    setSearchText,
    resetCategories,
    setCategory,
    searchHandler,
  } = useSearch()

  useEffect(() => {
    if (cartId) {
      fetch(`/api/cart?cartId=${cartId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.body) {
            setCart(data.body)
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false))
    }
  }, [cartId])

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
        {cart?.id ? (
          <DisplayCartInfo cart={cart} />
        ) : (
          <div className='flex justify-center items-center'>
            <TextXSmall faded>Your cart is empty.</TextXSmall>
          </div>
        )}
      </div>
    </main>
  )
}

function DisplayCartInfo({ cart }: { cart: Cart }) {
  const { cartLines, cost, buyerIdentity } = cart
  function formatMoney(number: number) {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(number)
  }

  return (
    <div className='grow grid grid-cols-[repeat(14,_minmax(0,_1fr))] gap-5 place-items-start'>
      <div className='col-span-11 w-full'>
        <TextIntro faded copy>
          Your Items &amp; Shipment
        </TextIntro>
        <div className='h-fit w-full flex flex-col mt-4 gap-6 bg-white rounded-xl border border-store-outline-faded-max p-5'>
          <HR>
            <div className='flex flex-col w-full gap-4'>
              {cartLines.map((cartLine) => {
                const { quantity, attributes } = cartLine

                const optionsidx = attributes.findIndex(
                  (attribute) => attribute.key === 'options'
                )
                const { options } = JSON.parse(attributes[optionsidx].value)

                const src = attributes.findIndex(
                  (attribute) => attribute.key === 'src'
                )
                const title = attributes.findIndex(
                  (attribute) => attribute.key === 'title'
                )
                const note = attributes.findIndex(
                  (attribute) => attribute.key === 'note'
                )
                const price = attributes.findIndex(
                  (attribute) => attribute.key === 'price'
                )

                return (
                  <HCard
                    src={attributes[src].value}
                    title={attributes[title].value}
                    amount={quantity}
                    variants={options}
                    note={attributes[note].value}
                    price={parseInt(attributes[price].value)}
                  />
                )
              })}
            </div>
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
                  <TextXSmall>{buyerIdentity.email}</TextXSmall>
                  <TextTiny fadedMax>{buyerIdentity.phone}</TextTiny>
                </div>
                <div className='flex flex-col gap-1'>
                  <TextTiny fadedMax>{buyerIdentity.address1}</TextTiny>
                  <TextTiny fadedMax>{buyerIdentity.city}</TextTiny>
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
                <TextXSmall>{formatMoney(cost.subtotalAmount)}</TextXSmall>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <TextTiny faded>Shipping Cost</TextTiny>
                <TextXSmall>
                  {formatMoney(cost.totalDutyAmount ?? 0)}
                </TextXSmall>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <TextTiny faded>Tax(10%)</TextTiny>
                <TextXSmall>{formatMoney(cost.totalTaxAmount)}</TextXSmall>
              </div>
            </div>
          </HR>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-between items-center gap-2'>
              <TextXSmall faded>Total</TextXSmall>
              <TextMid>{formatMoney(cost.totalAmount)}</TextMid>
            </div>
            <Button fillPrimary>Pay Now</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
