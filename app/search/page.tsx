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
import {
  Filter,
  DefaultFilter,
  FilterSection,
  Category,
} from '@/lib/temp/filter'
import Search from '@/lib/temp/search'
import useHeader from '@/theme/components/useHeader'

export default function Home() {
  const {HeaderPanel, FilterPanel, searchResults} = useHeader()

  return (
    <main className='min-h-screen flex flex-col'>
      <HeaderPanel />
      <div className='bg-gray-100/70 px-7 py-4 min-h-full grow grid grid-cols-11 gap-5 place-items-start'>
        <div className='col-span-3 h-fit w-full'>
          <FilterPanel />
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
