'use client'

import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineEmail, MdOutlineLocalShipping } from 'react-icons/md'
import { FiShare } from 'react-icons/fi'
import {
  TextIntro,
  TextLabel,
  TextMid,
  TextTiny,
  TextXSmall,
} from '@/theme/elements/text'
import { HR } from '@/theme/elements/rule'
import { BsStarFill } from 'react-icons/bs'
import { LuCircleDollarSign, LuPackageCheck, LuHeart } from 'react-icons/lu'
import Slider from '@/theme/components/product/slider'
import { OneOptionSelector } from '@/theme/components/outline-btns'
import Button from '@/theme/elements/button'
import EditAmount from '@/theme/components/editAmount'
import Tab from '@/theme/components/tab'
import useHeader from '@/theme/components/useHeader'

export default function Home() {
  const { HeaderPanel } = useHeader()

  return (
    <main className='min-h-screen flex flex-col'>
      <HeaderPanel />
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
