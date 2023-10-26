'use client'

import { useState, ReactNode } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { TextLabel } from '../elements/text'

export default function Accordion({
  title,
  defaultOpen,
  children,
}: {
  title: string
  children: ReactNode[] | ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className='w-full'>
      <div
        className='flex justify-between items-center gap-8'
        onClick={() => setOpen((prev) => !prev)}
      >
        <TextLabel>{title}</TextLabel>
        <IoIosArrowDown className={`${open && 'rotate-180'} text-sm`} />
      </div>
      <div
        className={`${
          open ? 'block' : 'hidden'
        } relative flex flex-col gap-3 items-start justify-start mt-3`}
      >
        {children}
      </div>
    </div>
  )
}
