import Image from 'next/image'
import { BsStarFill } from 'react-icons/bs'
import { TextMid, TextXSmall, TextTiny, TextIntro } from '../../elements/text'

export function VCard({
  title,
  variants,
  src,
  price,
  discount,
  colors,
  rating,
  amountSold,
}: {
  title: string
  variants: string[]
  src: string
  price: number
  discount: number
  colors: string[]
  rating: number
  amountSold: number
}) {
  return (
    <div className='flex flex-col w-[21.999999%] border border-store-outline-faded-max rounded-xl shadow-sm'>
      <Image
        loader={() => src}
        src={src}
        width={100}
        height={100}
        alt={`Image for product: ${title}`}
        className='w-full rounded-t-xl'
      />
      <div className='p-3 flex flex-col gap-3 items-start justify-end grow bg-white rounded-b-xl'>
        <div className='flex justify-start items-center gap-2'>
          <TextMid>${price}</TextMid>
          <span className='line-through text-red-400'>
            <TextTiny faded>${discount}</TextTiny>
          </span>
        </div>
        <div className='flex flex-col gap-2 my-1'>
          <TextXSmall faded>{title}</TextXSmall>
          <TextXSmall faded>{variants.join(' | ')}</TextXSmall>
        </div>
        <div className='flex justify-start items-center gap-2'>
          {colors.map((color) => (
            <div
              key={color}
              className='w-4 h-4 rounded-full border border-store-outline-faded-max'
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className='flex justify-start items-center gap-10'>
          <div className='flex justify-start items-center gap-2'>
            <BsStarFill className='text-xs text-yellow-500' />
            <TextTiny faded>{rating}</TextTiny>
          </div>
          <div className='flex justify-start gap-1'>
            <TextTiny faded>{amountSold}</TextTiny>
            <TextTiny faded>sold</TextTiny>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HCard({
  src,
  title,
  amount,
  variants,
  note,
  price,
}: {
  src: string
  title: string
  amount: number
  variants: string[]
  note: string
  price: number
}) {
  // Add the separator '|' betweeen every variant.
  const variantsWithSep = variants.join('.|.').split('.')

  return (
    <div className='grow grid grid-cols-[repeat(14,_minmax(0,_1fr))] gap-7 items-center'>
      <div className='col-span-3 rounded-2xl border border-store-outline-faded-max'>
        <Image
          src={src}
          width={400}
          height={400}
          alt={`Picture of ${title}`}
          className='w-full rounded-2xl'
        />
      </div>
      <div className='col-span-10 flex flex-col gap-5'>
        <TextIntro faded>{title}</TextIntro>
        <TextXSmall fadedMax>{amount} items</TextXSmall>
        <div className='flex items-center justify-start gap-5'>
          {variantsWithSep.map((variant) => (
            <TextXSmall key={variant} fadedMax>
              {variant}
            </TextXSmall>
          ))}
        </div>
        <TextXSmall fadedMax>Note: {note}</TextXSmall>
        <TextIntro>${price}</TextIntro>
      </div>
    </div>
  )
}
