'use client'

import { TbCoin } from 'react-icons/tb'
import { InputBarButton } from './inputBar'
import { OutlineButton } from './outline-btns'

export default function Range({
  ranges,
  min,
  max,
  setMin,
  setMax,
}: {
  ranges: number[][]
  min: number
  max: number
  setMin?: (value: number) => void
  setMax?: (value: number) => void
}) {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex flex-col gap-2'>
        <InputBarButton
          placeholder='Minimum'
          searchText={min?.toLocaleString('en-US')}
          setSearchText={(value: string) => setMin?.(parseInt(value))}
          faded
          reverse
        >
          <TbCoin />
        </InputBarButton>
        <InputBarButton
          placeholder='Maximum'
          searchText={max?.toLocaleString('en-US')}
          setSearchText={(value: string) => setMax?.(parseInt(value))}
          faded
          reverse
        >
          <TbCoin />
        </InputBarButton>
      </div>
      <div className='flex flex-wrap justify-between gap-2'>
        {ranges.map((range) => {
          const from = range[0],
          to = range[1]

          return (
            <OutlineButton
              key={`${from}~${to}`}
              selected={from === min && to === max}
              setSelected={(value: boolean) => {
                if (value) {
                  setMin?.(from)
                  setMax?.(to)
                } else {
                  setMin?.(0)
                  setMax?.(0)
                }
              }}
            >
              {`${from.toLocaleString('en-US')} - ${to.toLocaleString('en-US')}`}
            </OutlineButton>
          )
        })}
      </div>
    </div>
  )
}
