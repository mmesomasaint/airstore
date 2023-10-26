import { TextBase } from "../elements/text";

export default function EditAmount({
  value,
  setValue,
  full,
}: {
  value: number
  setValue?: (value: number) => void
  full?: boolean
}) {
  return (
    <div
      className={`flex justify-start items-center ${full ? 'w-full' : 'w-1/3'}`}
    >
      <button className='self-stretch px-4 bg-apple-store-pri text-white rounded-l-full'>
        <TextBase>-</TextBase>
      </button>
      <input
        name='amount'
        value={value}
        className={`grow w-full p-2 text-center placeholder:text-apple-store-faded placeholder:text-sm placeholder:font-semibold text-apple-store-faded font-semibold text-sm border border-apple-store-outline-faded-max focus:outline-none focus:border-apple-store-pri`}
        onChange={(e) => setValue?.(parseInt(e.target.value))}
      />
      <button className='self-stretch px-4 bg-apple-store-pri text-white rounded-r-full'>
        <TextBase>+</TextBase>
      </button>
    </div>
  )
}
