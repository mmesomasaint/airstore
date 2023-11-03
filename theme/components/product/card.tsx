import Image from 'next/image'
import { TextMid, TextXSmall, TextTiny, TextIntro } from '../../elements/text'
import Link from 'next/link'

export function VCard({
  title,
  handle,
  src,
  price,
  discount,
  colors,
  collectionHandle,
}: {
  title: string
  handle: string
  src: string
  price: number
  discount: number
  colors: string[]
  collectionHandle: string
}) {
  return (
    <div className='flex flex-col w-[14.5rem] border border-store-outline-faded-max rounded-xl shadow-sm'>
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
          <TextMid>&#8358;{price.toLocaleString('en-US')}</TextMid>
          <span className='line-through text-red-400'>
            <TextTiny faded>&#8358;{discount.toLocaleString('en-US')}</TextTiny>
          </span>
        </div>
        <div className='flex flex-col gap-2 my-1'>
          <TextXSmall faded>
            <Link className='hover:underline hover:underline-offset-4 hover:border-primary' href={`/collection/${collectionHandle}/product/${handle}`}>
              {title}
            </Link>
          </TextXSmall>
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
