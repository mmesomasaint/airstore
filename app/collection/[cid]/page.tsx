'use client'

import { IoIosArrowForward } from 'react-icons/io'
import { TextTiny } from '@/theme/elements/text'
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
