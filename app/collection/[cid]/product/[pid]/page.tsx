'use client'

import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineEmail, MdOutlineLocalShipping } from 'react-icons/md'
import { FiShare } from 'react-icons/fi'
import {
  TextBase,
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
import Header from '@/theme/components/header'
import useSearch from '@/theme/components/useSearch'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FullProduct, Variant } from '@/lib/product'

export default function Home() {
  const { cid, pid } = useParams()
  const [product, setProduct] = useState<FullProduct>()
  const [loading, setLoading] = useState(true)
  const {
    searchText,
    filter,
    categories,
    setSearchText,
    resetCategories,
    setCategory,
    searchHandler,
  } = useSearch()

  const getNormText = (text: any) => text.toString().split('-').join(' ')

  const DisplayProduct = () =>
    product ? (
      <ProductPanel product={product} />
    ) : (
      <div className='flex justify-center items-center'>
        <TextXSmall faded>Product doesn&apos;t exist.</TextXSmall>
      </div>
    )

  useEffect(() => {
    setLoading(true)

    fetch(`/api/get/producthandle=${pid.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.body)
        setLoading(false)
      })
  }, [])

  return (
    <main className='min-h-screen flex flex-col'>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        filter={filter}
        categories={categories}
        resetCategories={resetCategories}
        setCategory={setCategory}
        searchClick={searchHandler}
      />
      <div className='bg-gray-100/70 px-7 py-4 min-h-full grow gap-5 flex flex-col w-full'>
        <div className='flex justify-between items-center gap-10'>
          <span className='flex justify-start items-center gap-5'>
            <TextTiny faded>Home</TextTiny>
            <TextTiny faded>
              <IoIosArrowForward className='text-base' />
            </TextTiny>
            <TextTiny faded>
              <span className='capitalize'>{getNormText(cid)}</span>
            </TextTiny>
            <TextTiny faded>
              <IoIosArrowForward className='text-base' />
            </TextTiny>
            <TextTiny>
              <span className='capitalize'>{getNormText(pid)}</span>
            </TextTiny>
          </span>
        </div>
        {loading ? (
          <div className='flex justify-center items-center'>
            <TextXSmall faded>Loading...</TextXSmall>
          </div>
        ) : (
          <DisplayProduct />
        )}
      </div>
    </main>
  )
}

function ProductPanel({ product }: { product: FullProduct }) {
  const initialSelectedOptions = product.options.map((option) => ({
    name: option.name,
    value: option.values[0],
  }))
  const [amount, setAmount] = useState<number>(1)
  const [variant, setVariant] = useState<Variant>()
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>[]
  >(initialSelectedOptions)

  const addToSelectedOptions = (name: string, value: string) => {
    const prevIdx = selectedOptions.findIndex((option) => option.name === name)

    if (prevIdx === -1) {
      // If option does not exist, add it
      setSelectedOptions([...selectedOptions, { name, value }])
    } else {
      // If option exists, update it
      const newSelectedOptions = [...selectedOptions]
      newSelectedOptions[prevIdx].value = value
      setSelectedOptions(newSelectedOptions)
    }
  }

  useEffect(() => {
    fetch(`/api/get/product/variant?handle=${product.handle}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedOptions }),
    })
      .then((res) => res.json())
      .then((data) => {
        setVariant(data.body)
      })
  }, [selectedOptions])

  return (
    <div className='grow grid grid-cols-[repeat(14,_minmax(0,_1fr))] gap-5 place-items-start'>
      <div className='col-span-4 w-full '>
        <Slider srcList={product.images.map((img) => img.url) ?? []} />
      </div>
      <div className='col-span-7 flex flex-col justify-between items-stretch gap-5 w-full'>
        <HR>
          <div className='flex flex-col gap-4'>
            <TextMid faded>{product.title}</TextMid>
            <TextIntro>
              &#8358;{(variant?.price ?? product.price).toLocaleString('en-US')}
            </TextIntro>
            <span className='line-through text-red-500'>
              <TextBase faded>
                &#8358;{(variant?.discount ?? product.discount)?.toLocaleString('en-US')}
              </TextBase>
            </span>
          </div>
        </HR>
        <HR>
          <div className='flex flex-col gap-5'>
            {product.options.map((option) => (
              <div key={option.name} className='flex flex-col gap-2'>
                <TextXSmall>{option.name}</TextXSmall>
                {option.name === 'Color' ? (
                  <div className='flex justify-start items-center gap-2'>
                    {option.values.map((color) => (
                      <div
                        key={color}
                        className='w-6 h-6 rounded-full border border-store-outline-faded-max'
                        style={{ backgroundColor: color }}
                        onClick={() => addToSelectedOptions(option.name, color)}
                      />
                    ))}
                  </div>
                ) : (
                  <OneOptionSelector
                    selected={
                      selectedOptions.find(
                        (selectedOption) => selectedOption.name === option.name
                      )?.value ?? option.values[0]
                    }
                    options={option.values}
                    setSelected={(value: string) =>
                      addToSelectedOptions(option.name, value)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </HR>
        <HR>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-start items-center gap-2'>
              <MdOutlineLocalShipping className='text-base text-store-faded' />
              <div className='flex justify-start items-center gap-1'>
                <TextTiny faded>Sent from</TextTiny>
                <TextXSmall>Umuaguduani Street, Port Harcourt</TextXSmall>
              </div>
            </div>
            <div className='flex justify-start items-center gap-2'>
              <LuCircleDollarSign className='text-base text-store-faded' />
              <div className='flex justify-start items-center gap-1'>
                <TextTiny faded>Shipping Cost</TextTiny>
                <TextXSmall>$20</TextXSmall>
              </div>
            </div>
            <div className='flex justify-start items-center gap-2'>
              <LuPackageCheck className='text-base text-store-faded' />
              <div className='flex justify-start items-center gap-1'>
                <TextTiny faded>Estimated Delivery</TextTiny>
                <TextXSmall>3 days</TextXSmall>
              </div>
            </div>
          </div>
        </HR>
        <Tab titles={['Detail', 'Specification']}>
          <TextTiny faded copy>
            {product.descriptionHTML ?? 'No description'}
          </TextTiny>
          <div className='flex flex-col gap-2 text-store-faded'>
            <div className='flex justify-start items-center gap-1'>
              <TextTiny>Display</TextTiny>
              <TextXSmall fadedMax>14-inch XDR display</TextXSmall>
            </div>
            <div className='flex justify-start items-center gap-1'>
              <TextTiny>Color</TextTiny>
              <TextXSmall fadedMax>Silver Gray / Red / Silver</TextXSmall>
            </div>
            <div className='flex justify-start items-center gap-1'>
              <TextTiny>Ram</TextTiny>
              <TextXSmall fadedMax>16GB / 32GB</TextXSmall>
            </div>
            <div className='flex justify-start items-center gap-1'>
              <TextTiny>Chip</TextTiny>
              <TextXSmall fadedMax>M2 Pro</TextXSmall>
            </div>
            <div className='flex justify-start items-center gap-1'>
              <TextTiny>GPU</TextTiny>
              <TextXSmall fadedMax>16 Core / 32 Core</TextXSmall>
            </div>
            <div className='flex justify-start items-center gap-1'>
              <TextTiny>Display</TextTiny>
              <TextXSmall fadedMax>XDR display</TextXSmall>
            </div>
            <div className='flex justify-start items-center gap-1'>
              <TextTiny>Display</TextTiny>
              <TextXSmall fadedMax>XDR display</TextXSmall>
            </div>
          </div>
        </Tab>
      </div>
      <div className='col-span-3 h-fit w-full flex flex-col gap-5 bg-white rounded-xl border border-store-outline-faded-max p-5'>
        <HR>
          <div className='flex flex-col gap-2'>
            <TextXSmall>Set Quantity</TextXSmall>
            <EditAmount
              value={amount}
              max={variant?.quantityAvailable ?? amount}
              setValue={setAmount}
              full
            />
            <div className='flex justify-start items-center gap-1'>
              <TextTiny faded>Only</TextTiny>
              <TextTiny primary>
                {variant?.quantityAvailable ?? 0} items
              </TextTiny>
              <TextTiny faded>left</TextTiny>
            </div>
          </div>
        </HR>
        <HR>
          <div className='flex flex-col gap-2'>
            <TextXSmall>Add Notes</TextXSmall>
            <textarea
              rows={6}
              className='p-2 border border-store-outline-faded-max rounded-xl text-xs'
              placeholder='Type here..'
            />
          </div>
        </HR>
        <div className='flex flex-col gap-3'>
          <div className='flex justify-between items-center gap-2'>
            <TextTiny faded>Sum Total</TextTiny>
            <TextMid>
              &#8358;{((variant?.price ?? product.price) * amount).toLocaleString('en-US')}
            </TextMid>
          </div>
          <div className='flex flex-col gap-2'>
            <Button fillPrimary>Buy Now</Button>
            <Button outlinePrimary>Add to Cart</Button>
          </div>
          <div className='flex justify-between items-center gap-2 text-store-outline-faded-max'>
            <div className='flex justify-start items-center gap-1'>
              <MdOutlineEmail className='text-base text-store-faded-max' />
              <TextTiny faded>Chat</TextTiny>
            </div>
            <TextLabel>|</TextLabel>
            <div className='flex justify-start items-center gap-1'>
              <LuHeart className='text-base text-store-faded-max' />
              <TextTiny faded>Wishlist</TextTiny>
            </div>
            <TextLabel>|</TextLabel>
            <div className='flex justify-start items-center gap-1'>
              <FiShare className='text-base text-store-faded-max' />
              <TextTiny faded>Share</TextTiny>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
