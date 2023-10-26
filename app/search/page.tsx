'use client'

import { useState, useEffect, useMemo } from 'react'
import { TbShoppingBag } from 'react-icons/tb'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineEmail } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi'
import DropDown, { DropDownMultiple } from '@/theme/components/dropdown'
import { InputBarIcon } from '@/theme/components/inputBar'
import {
  TextIntro,
  TextLabel,
  TextMid,
  TextTiny,
  TextXSmall,
} from '@/theme/elements/text'
import Accordion from '@/theme/components/accordion'
import CheckBox from '@/theme/components/checkbox'
import { HR } from '@/theme/elements/rule'
import { products, Product } from '@/lib/temp/products'
import { VCard } from '@/theme/components/product/card'
import Range from '@/theme/components/range'
import Image from 'next/image'
import { Filter, DefaultFilter, FilterSection, Category } from '@/lib/temp/filter'
import Search from '@/lib/temp/search'

export default function Home() {
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>(products)
  const [filter, setFilter] = useState<Filter>(DefaultFilter)
  const categories = useMemo<string[]>(
    () => Object.keys(filter.categories),
    [filter]
  )

  // Filter Setters
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

  const setCategory = (value: boolean, category: string) => {
    setSectionValue(value, 'categories', category)
  }

  const setCondition = (value: boolean, condition: string) => {
    setSectionValue(value, 'conditions', condition)
  }

  const setPaymentGateway = (value: boolean, paymentGateway: string) => {
    setSectionValue(value, 'paymentGateways', paymentGateway)
  }

  const setPrice = (value: number, price: string) => {
    setSectionValue(value, 'price', price)
  }

  const resetCategories = () => {
    const categories = Object.keys(filter.categories)
    return categories.forEach((category) => setCategory(false, category))
  }

  useEffect(() => {
    const newResults = Search(searchText, filter)
    setSearchResults(newResults)
  }, [searchText, filter])

  return (
    <main className='min-h-screen flex flex-col'>
      <div className='flex border-y border-apple-store-outline-faded-max justify-between items-center gap-40 px-7 py-4'>
        <TextIntro primary>iStore</TextIntro>
        <div className='grow flex justify-center items-center gap-5'>
          <DropDownMultiple
            title={'Categories'}
            selectedItems={[
              ...categories.filter((category) => {
                // Return only categories with `true` value
                return filter.categories[category as Category] === true
              }),
            ]}
            items={categories}
            setSelectedItems={(values: string[]) => {
              // Reset the categories(Set all categories to default value i.e false).
              resetCategories()
              // Set the categories in `values` to true.
              return values.forEach((category) => setCategory(true, category))
            }}
          />
          <InputBarIcon searchText={searchText} setSearchText={setSearchText} />
        </div>
        <div className='flex justify-end items-center gap-3 text-apple-store-outline-faded-max'>
          <TbShoppingBag className='text-apple-store-faded-max text-xl' />
          <IoMdNotificationsOutline className='text-apple-store-faded-max text-xl' />
          <MdOutlineEmail className='text-apple-store-faded-max text-xl' />
          <TextLabel>|</TextLabel>
          <div className='relative w-7 h-7 rounded-full border border-apple-store-outline-faded-max'>
            <Image
              src='/imgs/woman-avatar.jpg'
              fill
              alt='avatar'
              className='rounded-full'
            />
          </div>
        </div>
      </div>
      <div className='border-b flex justify-between items-center gap-10 border-apple-store-outline-faded-max px-7 py-4'>
        <div className='flex justify-start items-center gap-5'>
          <TextTiny fadedMax>Macbook M2 Air</TextTiny>
          <TextTiny fadedMax>Macbook M2 Pro</TextTiny>
          <TextTiny fadedMax>Apple Watch Ultra</TextTiny>
          <TextTiny fadedMax>Airpods Max</TextTiny>
          <TextTiny fadedMax>iPad Pro</TextTiny>
        </div>
        <div className='flex justify-start items-center gap-2'>
          <span className='flex justify-start items-center gap-1'>
            <FiMapPin className='text-sm text-apple-store-faded-max' />
            <TextXSmall fadedMax>Ships to</TextXSmall>
          </span>
          <TextXSmall>Umuajonisi River, Port Harcourt</TextXSmall>
        </div>
      </div>
      <div className='bg-gray-100/70 px-7 py-4 min-h-full grow grid grid-cols-11 gap-5 place-items-start'>
        <div className='col-span-3 h-fit w-full flex flex-col gap-5 bg-white rounded-xl border border-apple-store-outline-faded-max p-5'>
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
                setCheck={(value: boolean) => setCondition(value, 'fairlyUsed')}
              >
                Fairly Used
              </CheckBox>
              <CheckBox
                check={filter.conditions.secondHand}
                setCheck={(value: boolean) => setCondition(value, 'secondHand')}
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
              setCheck={(value: boolean) => setPaymentGateway(value, 'prepaid')}
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
        <div className='col-span-8 gap-5 flex flex-col w-full'>
          <div className='flex justify-between items-center gap-10'>
            <span className='flex justify-start items-center gap-1'>
              <TextTiny>Showing 1-60 items out of a total of 1.2k for</TextTiny>
              <TextTiny primary>"Apple"</TextTiny>
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
          <div className='flex flex-wrap justify-between items-stretch gap-5'>
            {searchResults.map((product: Product, id) => (
              <VCard
                key={`${product.src + id}`}
                title={product.title}
                variants={product.variants}
                src={product.src}
                price={product.price}
                discount={product.discount}
                colors={product.colors}
                rating={product.rating}
                amountSold={product.amountSold}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
