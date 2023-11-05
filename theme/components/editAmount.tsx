import { TextBase } from '../elements/text'

export default function EditAmount({
  value,
  setValue,
  full,
  max,
}: {
  value: number
  max: number
  setValue?: (value: number) => void
  full?: boolean
}) {
  return (
    <div
      className={`flex justify-start items-center ${full ? 'w-full' : 'w-1/3'}`}
    >
      <button
        disabled={value <= 1}
        className='self-stretch px-4 bg-store-pri disabled:bg-store-pri/30 text-white rounded-l-full'
        onClick={() => setValue?.(value - 1)}
      >
        <TextBase>-</TextBase>
      </button>
      <input
        name='amount'
        value={value}
        className={`grow w-full p-2 text-center placeholder:text-store-faded placeholder:text-sm placeholder:font-semibold text-store-faded font-semibold text-sm border border-store-outline-faded-max focus:outline-none focus:border-store-pri`}
        onChange={(e) => setValue?.(parseInt(e.target.value))}
      />
      <button
        disabled={value >= max}
        className='self-stretch px-4 bg-store-pri disabled:bg-store-pri/30 text-white rounded-r-full'
        onClick={() => setValue?.(value + 1)}
      >
        <TextBase>+</TextBase>
      </button>
    </div>
  )
}
