'use client'

import { TextLabel } from '../elements/text'

export default function OutlineButtons({
  options,
  setOptions,
  col,
}: {
  options: {}
  setOptions?: (prev: {}) => void
  col?: boolean
}) {
  const setSelectedHandler = (value: boolean, key: string) => {
    const newOptions = { ...options, [key]: value }
    setOptions?.(newOptions)
  }

  return (
    <div
      className={`flex ${col && 'flex-col'} items-center justify-start gap-3`}
    >
      {Object.keys(options).map((option) => (
        <OutlineButton
          key={option}
          setSelected={(value) => setSelectedHandler(value, option)}
        >
          {option}
        </OutlineButton>
      ))}
    </div>
  )
}

export function oneOptionSelector({
  selected,
  options,
  setSelected,
}: {
  selected: string
  options: string[]
  setSelected: (value: string) => void
}) {
  return (
    <div className='flex justify-start items-center gap-3'>
      {options.map((option) => (
        <OutlineButton
          key={option}
          selected={option === selected}
          setSelected={() => setSelected(option)}
        >
          {option}
        </OutlineButton>
      ))}
    </div>
  )
}

export function OutlineButton({
  large,
  selected,
  setSelected,
  children,
}: {
  children: string
  selected?: boolean
  setSelected?: (value: boolean) => void
  large?: boolean
}) {
  return (
    <div
      onClick={() => setSelected?.(!selected)}
      className={`cursor-pointer inline-block p-4 rounded-3xl border ${
        large && 'p-5 rounded-3xl'
      } ${
        selected
          ? 'border-store-pri text-store-pri'
          : 'border-store-outline-faded-max text-store-faded'
      }`}
    >
      <TextLabel faded={!selected} primary={selected} large={large}>
        {children}
      </TextLabel>
    </div>
  )
}
