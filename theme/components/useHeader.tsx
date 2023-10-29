import { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { HR } from '../elements/rule'
import {
  TextIntro,
  TextLabel,
  TextMid,
  TextTiny,
  TextXSmall,
} from '../elements/text'
import Accordion from './accordion'
import CheckBox from './checkbox'
import Range from './range'
import { Product, products } from '@/lib/temp/products'
import {
  Category,
  DefaultFilter,
  Filter,
  FilterSection,
} from '@/lib/temp/filter'
import Search from '@/lib/temp/search'
import { DropDownMultiple } from './dropdown'
import { InputBarIcon } from './inputBar'
import { TbShoppingBag } from 'react-icons/tb'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdOutlineEmail } from 'react-icons/md'
import Image from 'next/image'
import { FiMapPin } from 'react-icons/fi'

export default function useHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchText, setSearchText] = useState(
    searchParams.get('q') ?? undefined
  )
  const [searchResults, setSearchResults] = useState<Product[]>(products)
  const [filter, setFilter] = useState<Filter>(DefaultFilter)
  const categories = useMemo<string[]>(
    () => Object.keys(filter.categories),
    [filter]
  )
  // Filter Setters
  const setSectionValue = (
    value: boolean | number,
    section: FilterSection,
    id: string
  ) => {
    setFilter((prev) => ({
      ...prev,
      [section]: { ...prev[section], [id]: value },
    }))
  }
  const isSearchPg = pathname === '/search'

  const setCategory = (value: boolean, category: string) => {
    setSectionValue(value, 'categories', category)
  }

  const setCondition = (value: boolean, condition: string) => {
    setSectionValue(value, 'conditions', condition)
  }

  const setPaymentGateway = (value: boolean, paymentGateway: string) => {
    setSectionValue(value, 'paymentGateways', paymentGateway)
  }

  const setPrice = (value: number, price: string) => {
    setSectionValue(value, 'price', price)
  }

  const resetCategories = () => {
    const categories = Object.keys(filter.categories)
    return categories.forEach((category) => setCategory(false, category))
  }

  const goToSearchPg = () => {
    if (isSearchPg) return

    // Go to the search page if not already there.
    router.push(`/search?q=${searchText}`)
  }

  const getSearchResults = async () => {
    const results = await search(searchText, {})

    // Set results body, data with search results.
  }

  useEffect(() => {
    if (isSearchPg) {
      getSearchResults()
    }
  }, [isSearchPg])

  return {
    HeaderPanel: () => (
      <>
        <div className='flex border-y border-store-outline-faded-max justify-between items-center gap-40 px-7 py-4'>
          <TextIntro primary>Airstore</TextIntro>
          <div className='grow flex justify-center items-center gap-5'>
            <DropDownMultiple
              title={'Categories'}
              selectedItems={[
                ...categories.filter((category) => {
                  // Return only categories with `true` value
                  return filter.categories[category as Category] === true
                }),
              ]}
              items={categories}
              setSelectedItems={(values: string[]) => {
                // Reset the categories(Set all categories to default value i.e false).
                resetCategories()
                // Set the categories in `values` to true.
                return values.forEach((category) => setCategory(true, category))
              }}
            />
            <InputBarIcon
              searchText={searchText}
              setSearchText={setSearchText}
              showBtn
            />
          </div>
          <div className='flex justify-end items-center gap-3 text-store-outline-faded-max'>
            <TbShoppingBag className='text-store-faded-max text-xl' />
            <IoMdNotificationsOutline className='text-store-faded-max text-xl' />
            <MdOutlineEmail className='text-store-faded-max text-xl' />
            <TextLabel>|</TextLabel>
            <div className='relative w-7 h-7 rounded-full border border-store-outline-faded-max'>
              <Image
                src='/imgs/woman-avatar.jpg'
                fill
                alt='avatar'
                className='rounded-full'
              />
            </div>
          </div>
        </div>
        <div className='border-b flex justify-between items-center gap-10 border-store-outline-faded-max px-7 py-4'>
          <div className='flex justify-start items-center gap-5'>
            <TextTiny fadedMax>Macbook Pro</TextTiny>
            <TextTiny fadedMax>Macbook Air</TextTiny>
            <TextTiny fadedMax>Watch Ultra</TextTiny>
            <TextTiny fadedMax>Watch Series 9</TextTiny>
            <TextTiny fadedMax>Airpods Max</TextTiny>
            <TextTiny fadedMax>Airpods Pro 2</TextTiny>
            <TextTiny fadedMax>iPad</TextTiny>
            <TextTiny fadedMax>iPhone</TextTiny>
          </div>
          <div className='flex justify-start items-center gap-2'>
            <span className='flex justify-start items-center gap-1'>
              <FiMapPin className='text-sm text-store-faded-max' />
              <TextXSmall fadedMax>Ships to</TextXSmall>
            </span>
            <TextXSmall>Umuajonisi River, Port Harcourt</TextXSmall>
          </div>
        </div>
      </>
    ),
    FilterPanel: () => (
      <div className='h-fit w-full flex flex-col gap-5 bg-white rounded-xl border border-store-outline-faded-max p-5'>
        <TextMid>Filters</TextMid>
        <HR>
          <Accordion title='Categories' defaultOpen>
            <CheckBox
              check={filter.categories.airpod}
              setCheck={(value: boolean) => setCategory(value, 'airpod')}
            >
              Airpods
            </CheckBox>
            <CheckBox
              check={filter.categories.iPhone}
              setCheck={(value: boolean) => setCategory(value, 'iPhone')}
            >
              iPhone
            </CheckBox>
            <CheckBox
              check={filter.categories.iPad}
              setCheck={(value: boolean) => setCategory(value, 'iPad')}
            >
              iPad
            </CheckBox>
            <CheckBox
              check={filter.categories.macbook}
              setCheck={(value: boolean) => setCategory(value, 'macbook')}
            >
              Macbook
            </CheckBox>
            <CheckBox
              check={filter.categories.iWatch}
              setCheck={(value: boolean) => setCategory(value, 'iWatch')}
            >
              iWatch
            </CheckBox>
          </Accordion>
        </HR>
        <HR>
          <Accordion title='Condition'>
            <CheckBox
              check={filter.conditions.newStuff}
              setCheck={(value: boolean) => setCondition(value, 'newStuff')}
            >
              New Stuff
            </CheckBox>
            <CheckBox
              check={filter.conditions.fairlyUsed}
              setCheck={(value: boolean) => setCondition(value, 'fairlyUsed')}
            >
              Fairly Used
            </CheckBox>
            <CheckBox
              check={filter.conditions.secondHand}
              setCheck={(value: boolean) => setCondition(value, 'secondHand')}
            >
              Second Hand
            </CheckBox>
          </Accordion>
        </HR>
        <HR>
          <Accordion title='Price'>
            <Range
              ranges={[
                [500, 1000],
                [1000, 1500],
                [1500, 2000],
                [2000, 2500],
                [2500, 3000],
              ]}
              min={filter.price.min}
              max={filter.price.max}
              setMin={(value: number) => setPrice(value, 'min')}
              setMax={(value: number) => setPrice(value, 'max')}
            />
          </Accordion>
        </HR>
        <Accordion title='Payment' defaultOpen>
          <CheckBox
            check={filter.paymentGateways.cashOnDelivery}
            setCheck={(value: boolean) =>
              setPaymentGateway(value, 'cashOnDelivery')
            }
          >
            Cash on Delivery
          </CheckBox>
          <CheckBox
            check={filter.paymentGateways.prepaid}
            setCheck={(value: boolean) => setPaymentGateway(value, 'prepaid')}
          >
            Prepaid
          </CheckBox>
          <CheckBox
            check={filter.paymentGateways.iStoreCoupon}
            setCheck={(value: boolean) =>
              setPaymentGateway(value, 'iStoreCoupon')
            }
          >
            iStore Coupon
          </CheckBox>
          <CheckBox
            check={filter.paymentGateways.binancePay}
            setCheck={(value: boolean) =>
              setPaymentGateway(value, 'binancePay')
            }
          >
            Binance Pay
          </CheckBox>
        </Accordion>
      </div>
    ),
    searchResults,
  }
}
