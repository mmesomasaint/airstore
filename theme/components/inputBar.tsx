'use client'

import { RiSearchLine } from 'react-icons/ri'
import { TextLabel, TextTiny, TextMid } from '../elements/text'

export function InputBarIcon({
  searchText,
  setSearchText,
  showBtn,
  clickHandler,
}: {
  searchText?: string
  setSearchText?: (value: string) => void
  showBtn?: boolean
  clickHandler?: () => void
}) {
  return (
    <div className='relative h-fit w-full group'>
      <RiSearchLine className='text-xl z-10 absolute top-[50%] -translate-y-[50%] left-5 pointer-events-none text-store-faded  group-focus-within:text-store-pri' />
      <input
        name='searchText'
        value={searchText}
        className='w-full rounded-full p-3 pl-12 pr-2 placeholder:text-store-faded placeholder:text-base placeholder:font-semibold text-store-faded font-semibold text-base border border-store-outline-faded-max group-focus-within:outline-store-pri'
        placeholder='Search Store'
        onChange={(e) => setSearchText?.(e.target.value)}
      />
      {showBtn && (
        <button
          type='button'
          onClick={clickHandler}
          className='absolute z-30 top-[50%] -translate-y-[50%] right-1 px-4 h-[calc(100%_-_8px)] rounded-3xl bg-store-pri text-white'
        >
          Search
        </button>
      )}
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
        } w-full p-2 placeholder:text-store-faded placeholder:text-sm placeholder:font-semibold text-store-faded font-semibold text-sm border border-store-outline-faded-max focus:outline-none focus:border-store-pri`}
        onChange={(e) => setSearchText?.(e.target.value)}
      />
      <button
        className={`self-stretch px-4 ${
          faded
            ? 'bg-store-outline-faded-max'
            : 'bg-store-pri/80 hover:bg-store-pri'
        } text-white ${reverse ? 'rounded-l-full' : 'rounded-r-full'}`}
      >
        {textSize}
      </button>
    </div>
  )
}
