'use client'

import { IoIosArrowForward } from 'react-icons/io'
import { MdOutlineEmail, MdOutlineLocalShipping } from 'react-icons/md'
import { FiShare } from 'react-icons/fi'
import {
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
            <TextTiny faded>Macbook</TextTiny>
            <TextTiny faded>
              <IoIosArrowForward className='text-base' />
            </TextTiny>
            <TextTiny>Apple Macbook Pro 14'' 2022 | M2 Max Chip</TextTiny>
          </span>
        </div>
        <div className='grow grid grid-cols-[repeat(14,_minmax(0,_1fr))] gap-5 place-items-start'>
          <div className='col-span-4 w-full '>
            <Slider
              srcList={[
                'https://istore.com.ng/cdn/shop/products/macbook_pro_13_in_space_gray_pdp_image_position-1__wwen_1_1_2048x.jpg?v=1657300024',
                'https://istore.com.ng/cdn/shop/products/macbook_pro_13_in_space_gray_pdp_image_position-2__wwen_1_1_2048x.jpg?v=1657300025',
                'https://istore.com.ng/cdn/shop/products/macbook_pro_13_in_silver_pdp_image_position-1__wwen_2048x.jpg?v=1657300339',
                'https://istore.com.ng/cdn/shop/products/macbook_pro_13_in_silver_pdp_image_position-2__wwen_2048x.jpg?v=1657300339',
              ]}
            />
          </div>
          <div className='col-span-7 flex flex-col justify-between items-stretch gap-5 w-full'>
            <HR>
              <div className='flex flex-col gap-4'>
                <TextMid faded>
                  Apple Macbook Pro 14'' 2022 | M2 Max Chip
                </TextMid>
                <TextIntro>$2,915</TextIntro>
                <div className='flex justify-start items-center gap-4'>
                  <div className='flex justify-start items-center gap-2'>
                    <BsStarFill className='text-base text-yellow-500' />
                    <TextTiny faded>4.8</TextTiny>
                  </div>
                  <div className='flex justify-start gap-1'>
                    <TextTiny faded>680</TextTiny>
                    <TextTiny faded>sold</TextTiny>
                  </div>
                </div>
              </div>
            </HR>
            <HR>
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-2'>
                  <TextXSmall>Color</TextXSmall>
                  <div className='flex justify-start items-center gap-2'>
                    {['gray', 'lime', 'red'].map((color) => (
                      <div
                        key={color}
                        className='w-6 h-6 rounded-full border border-store-outline-faded-max'
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <TextXSmall>Processor</TextXSmall>
                  <OneOptionSelector
                    selected='16GB, 16 Core GPU Apple M2 Chip'
                    options={[
                      '32GB, 32 Core GPU Apple M2 Chip',
                      '16GB, 16 Core GPU Apple M2 Chip',
                    ]}
                    setSelected={(value: string) => {
                      return
                    }}
                  />
                </div>
                <div className='flex flex-col gap-2'>
                  <TextXSmall>Memory Size</TextXSmall>
                  <OneOptionSelector
                    selected='512GB'
                    options={['512GB', '1TB']}
                    setSelected={(value: string) => {
                      return
                    }}
                  />
                </div>
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
                The new Macbook Pro delivers outstanding performance for pro
                users. Choose between the reliable M2 pro or even the more
                reliable M2 max to power up your pro level workflows and get
                incredible battery life. With a stunning 13-inch retina XDR
                display and a range of pro ports, you can't just imagine this
                feeling. You experience it.
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
                <EditAmount value={1} full />
                <div className='flex justify-start items-center gap-1'>
                  <TextTiny faded>Only</TextTiny>
                  <TextTiny primary>10 items</TextTiny>
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
                <TextMid>$2,915</TextMid>
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
      </div>
    </main>
  )
}