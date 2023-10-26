'use client'

import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { TbCategory2 } from 'react-icons/tb'
import { TextLabel, TextTiny } from '../elements/text'

export default function DropDown({
  selected,
  setSelected,
  items,
  full,
  large,
}: {
  selected: string
  setSelected?: (value: string) => void
  items: string[]
  full?: boolean
  large?: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`cursor-pointer inline-block relative w-[25%] ${full && 'grow'}`}>
      <div
        className={`flex justify-between items-center gap-5 p-3 border ${
          open ? 'border-store-pri' : 'border-store-outline-faded-max'
        } rounded-t-2xl ${open ? 'rounded-b-none' : 'rounded-2xl'}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {large ? (
          <TextLabel faded>{selected}</TextLabel>
        ) : (
          <TextTiny faded>{selected}</TextTiny>
        )}
        <IoIosArrowDown
          className={`shrink-0 text-xs ${
            large && 'text-sm'
          } text-store-pri ${open && 'rotate-180'}`}
        />
      </div>
      <div
        className={`${
          open ? 'block' : 'hidden'
        } w-full absolute left-0 top-[100%] border-y border-store-faded-max border-t-0 border-b-0 rounded-b-2xl flex flex-col`}
      >
        {items.map((item) => {
          const isSelected = selected === item

          return (
            <DropItem
              key={`${item}~${isSelected}`}
              isSelected={isSelected}
              setValue={(value) => setSelected?.(value)}
              full={full}
              large={large}
            >
              {item}
            </DropItem>
          )
        })}
      </div>
    </div>
  )
}

export function DropDownMultiple({
  title,
  selectedItems,
  setSelectedItems,
  items,
  full,
}: {
  title: string
  selectedItems: string[]
  setSelectedItems?: (values: string[]) => void
  items: string[]
  full?: boolean
}) {
  const [open, setOpen] = useState(false)

  const onSetSelectedItems = (value: string) => {
    let newList = selectedItems
    const idxOfValue = newList.indexOf(value)

    // If value is already selected, unselect it.
    if (idxOfValue === -1) newList.push(value)
    else {
      newList = [
        ...newList.slice(0, idxOfValue),
        ...newList.slice(idxOfValue + 1),
      ]
    }

    setSelectedItems?.(newList)
  }

  return (
    <div className={`inline-block relative w-[25%] cursor-pointer`}>
      <div
        className={`flex justify-between items-center gap-5 p-3 rounded-t-2xl ${
          open ? 'rounded-b-none' : 'rounded-2xl'
        }`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div
          className={`flex justify-start items-center gap-1 text-store-faded-max ${
            open && 'text-store-pri'
          }`}
        >
          <TbCategory2 className='text-xl' />
          <TextLabel>{title}</TextLabel>
        </div>
        <IoIosArrowDown
          className={`shrink-0 text-sm text-store-pri ${
            open && 'rotate-180'
          }`}
        />
      </div>
      <div
        className={`${
          open ? 'block' : 'hidden'
        } w-full absolute z-30 left-0 top-[100%] border-y border-store-faded-max border-t-0 border-b-0 rounded-b-2xl flex flex-col`}
      >
        {items.map((item) => {
          const isSelected = selectedItems.includes(item)

          return (
            <DropItem
              key={`${item}~${isSelected}`}
              isSelected={isSelected}
              setValue={(value) => onSetSelectedItems(value)}
              full={full}
            >
              {item}
            </DropItem>
          )
        })}
      </div>
    </div>
  )
}

function DropItem({
  isSelected,
  setValue,
  full,
  large,
  children,
}: {
  isSelected: boolean
  setValue: (value: string) => void
  children: string
  full?: boolean
  large?: boolean
}) {
  return (
    <div
      onClick={() => setValue(children)}
      className={`bg-white last:rounded-b-2xl p-5 border ${
        isSelected
          ? 'border-store-pri text-store-pri'
          : 'last:border-b-store-faded-max border-x-store-faded-max text-store-faded-max'
      } ${full && 'w-full'} hover:border-y hover:border-store-pri`}
    >
      {large ? (
        <TextLabel>{children}</TextLabel>
      ) : (
        <TextTiny>{children}</TextTiny>
      )}
    </div>
  )
}
