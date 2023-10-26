'use client'

import { RiSearchLine } from 'react-icons/ri'
import { TextLabel, TextTiny, TextMid } from '../elements/text'

export function InputBarIcon({
  large,
  searchText,
  setSearchText,
}: {
  large?: boolean
  searchText?: string
  setSearchText?: (value: string) => void
}) {
  return (
    <div className='relative h-fit w-full group'>
      <RiSearchLine className='text-xl z-10 absolute top-[50%] -translate-y-[50%] left-5 pointer-events-none text-apple-store-faded  group-focus-within:text-apple-store-pri' />
      <input
        name='searchText'
        value={searchText}
        className='w-full rounded-full p-3 pl-12 pr-2 placeholder:text-apple-store-faded placeholder:text-base placeholder:font-semibold text-apple-store-faded font-semibold text-base border border-apple-store-outline-faded-max group-focus-within:outline-apple-store-pri'
        placeholder='Search Store'
        onChange={(e) => setSearchText?.(e.target.value)}
      />
    </div>
  )
}

export function InputBarButton({
  large,
  searchText,
  setSearchText,
  reverse,
  faded,
  placeholder,
  children,
}: {
  children: React.ReactNode
  large?: boolean
  searchText?: string
  setSearchText?: (value: string) => void
  reverse?: boolean
  faded?: boolean
  placeholder?: string
}) {
  const textSizeFromOrient = reverse ? (
    <TextMid faded={faded}>{children}</TextMid>
  ) : (
    <TextTiny faded={faded}>{children}</TextTiny>
  )
  
  const textSize = large ? (
    <TextLabel faded={faded}>{children}</TextLabel>
  ) : (
    textSizeFromOrient
  )

  return (
    <div className='flex justify-start items-center'>
      <input
        name='searchText'
        placeholder={placeholder}
        value={searchText}
        className={`grow ${reverse && 'order-last'} ${
          reverse ? 'rounded-r-2xl' : 'rounded-l-full'
        } w-full p-2 placeholder:text-apple-store-faded placeholder:text-sm placeholder:font-semibold text-apple-store-faded font-semibold text-sm border border-apple-store-outline-faded-max focus:outline-none focus:border-apple-store-pri`}
        onChange={(e) => setSearchText?.(e.target.value)}
      />
      <button
        className={`self-stretch px-4 ${
          faded
            ? 'bg-apple-store-outline-faded-max'
            : 'bg-apple-store-pri/80 hover:bg-apple-store-pri'
        } text-white ${reverse ? 'rounded-l-full' : 'rounded-r-full'}`}
      >
        {textSize}
      </button>
    </div>
  )
}
