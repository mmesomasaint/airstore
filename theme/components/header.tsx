import { Category, Filter } from '@/lib/filter'
import { TextIntro, TextLabel, TextTiny, TextXSmall } from '../elements/text'
import { DropDownMultiple } from './dropdown'
import { InputBarIcon } from './inputBar'
import { TbShoppingBag } from 'react-icons/tb'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineEmail } from 'react-icons/md'
import Image from 'next/image'
import { FiMapPin } from 'react-icons/fi'

export default function Header({
  searchText,
  setSearchText,
  filter,
  categories,
  resetCategories,
  setCategory,
  searchClick,
}: {
  searchText: string | undefined
  setSearchText: (value: string) => void
  filter: Filter
  categories: string[]
  resetCategories: () => void
  setCategory: (value: boolean, category: string) => void
  searchClick: () => void
}) {
  return (
    <>
      <div className='flex border-y border-store-outline-faded-max justify-between items-center gap-40 px-7 py-4'>
        <TextIntro primary>Airstore</TextIntro>
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
          <InputBarIcon
            searchText={searchText}
            setSearchText={setSearchText}
            clickHandler={searchClick}
            showBtn
          />
        </div>
        <div className='flex justify-end items-center gap-3 text-store-outline-faded-max'>
          <TbShoppingBag className='text-store-faded-max text-xl' />
          <IoMdNotificationsOutline className='text-store-faded-max text-xl' />
          <MdOutlineEmail className='text-store-faded-max text-xl' />
          <TextLabel>|</TextLabel>
          <div className='relative w-7 h-7 rounded-full border border-store-outline-faded-max'>
            <Image
              src='/imgs/woman-avatar.jpg'
              fill
              alt='avatar'
              className='rounded-full'
            />
          </div>
        </div>
      </div>
      <div className='border-b flex justify-between items-center gap-10 border-store-outline-faded-max px-7 py-4'>
        <div className='flex justify-start items-center gap-5'>
          <TextTiny fadedMax>Macbook Pro</TextTiny>
          <TextTiny fadedMax>Macbook Air</TextTiny>
          <TextTiny fadedMax>Watch Ultra</TextTiny>
          <TextTiny fadedMax>Watch Series 9</TextTiny>
          <TextTiny fadedMax>Airpods Max</TextTiny>
          <TextTiny fadedMax>Airpods Pro 2</TextTiny>
          <TextTiny fadedMax>iPad</TextTiny>
          <TextTiny fadedMax>iPhone</TextTiny>
        </div>
        <div className='flex justify-start items-center gap-2'>
          <span className='flex justify-start items-center gap-1'>
            <FiMapPin className='text-sm text-store-faded-max' />
            <TextXSmall fadedMax>Ships to</TextXSmall>
          </span>
          <TextXSmall>Umuajonisi River, Port Harcourt</TextXSmall>
        </div>
      </div>
    </>
  )
}
