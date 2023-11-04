import { Filter } from '@/lib/filter'
import { HR } from '../elements/rule'
import Accordion from './accordion'
import CheckBox from './checkbox'
import Range from './range'
import { TextMid, TextXSmall } from '../elements/text'
import { CollectionFilter } from '@/app/collection/filter'

export default function Filter({
  filter,
  pending,
  setCategory,
  setColor,
  setPrice,
  setDateAdded,
}: {
  filter: Filter
  pending: boolean
  setCategory: (value: boolean, category: string) => void
  setColor: (value: boolean, color: string) => void
  setPrice: (value: number, price: string) => void
  setDateAdded: (value: boolean, dateAdded: string) => void
}) {
  return (
    <div className='h-fit w-full flex flex-col gap-5 bg-white rounded-xl border border-store-outline-faded-max p-5'>
      <TextMid>Filters</TextMid>
      {pending ? (
        <div className='flex justify-center items-center w-full'>
          <TextXSmall faded>Loading...</TextXSmall>
        </div>
      ) : (
        <>
          {filter.categories && (
            <HR>
              <Accordion title='Categories' defaultOpen>
                {Object.keys(filter.categories).map((category) => (
                  <CheckBox
                    key={category}
                    check={filter.categories[category]}
                    setCheck={(value: boolean) => setCategory(value, category)}
                  >
                    {category}
                  </CheckBox>
                ))}
              </Accordion>
            </HR>
          )}
          {filter.colors && (
            <HR>
              <Accordion title='Colors' defaultOpen>
                <div className='grow grid grid-cols-2 gap-x-5 gap-y-3'>
                  {Object.keys(filter.colors).map((color) => (
                    <CheckBox
                      key={color}
                      check={filter.colors[color]}
                      setCheck={(value: boolean) => setColor(value, color)}
                    >
                      {color}
                    </CheckBox>
                  ))}
                </div>
              </Accordion>
            </HR>
          )}
          {filter.dateAdded && (
            <HR>
              <Accordion title='Date Added' defaultOpen>
                {Object.keys(filter.dateAdded).map((date) => (
                  <CheckBox
                    key={date}
                    check={filter.dateAdded[date]}
                    setCheck={(value: boolean) => setDateAdded(value, date)}
                  >
                    {date}
                  </CheckBox>
                ))}
              </Accordion>
            </HR>
          )}
          {filter.price.tooMax > 0 && (
            <Accordion title='Price' defaultOpen>
              <Range
                ranges={(() => {
                  const by2 = filter.price.tooMax / 2
                  const by4 = filter.price.tooMax / 4

                  return [
                    [0, by4],
                    [by4, by4 + by4],
                    [by4 + by4, by2 + by4],
                    [by2 + by4, filter.price.tooMax],
                  ]
                })()}
                min={filter.price.min}
                max={filter.price.max}
                setMin={(value: number) => setPrice(value, 'min')}
                setMax={(value: number) => setPrice(value, 'max')}
              />
            </Accordion>
          )}
        </>
      )}
    </div>
  )
}

export function CollectionFilterer({
  filter,
  pending,
  setColor,
  setPrice,
}: {
  filter: CollectionFilter
  pending: boolean
  setColor: (value: boolean, color: string) => void
  setPrice: (value: number, price: string) => void
}) {
  return (
    <div className='h-fit w-full flex flex-col gap-5 bg-white rounded-xl border border-store-outline-faded-max p-5'>
      <TextMid>Filters</TextMid>
      {pending ? (
        <div className='flex justify-center items-center w-full'>
          <TextXSmall faded>Loading...</TextXSmall>
        </div>
      ) : (
        <>
          {filter.colors && (
            <HR>
              <Accordion title='Colors' defaultOpen>
                <div className='grow grid grid-cols-2 gap-x-5 gap-y-3'>
                  {Object.keys(filter.colors).map((color) => (
                    <CheckBox
                      key={color}
                      check={filter.colors[color]}
                      setCheck={(value: boolean) => setColor(value, color)}
                    >
                      {color}
                    </CheckBox>
                  ))}
                </div>
              </Accordion>
            </HR>
          )}
          {filter.price.tooMax > 0 && (
            <Accordion title='Price' defaultOpen>
              <Range
                ranges={(() => {
                  const by2 = filter.price.tooMax / 2
                  const by4 = filter.price.tooMax / 4

                  return [
                    [0, by4],
                    [by4, by4 + by4],
                    [by4 + by4, by2 + by4],
                    [by2 + by4, filter.price.tooMax],
                  ]
                })()}
                min={filter.price.min}
                max={filter.price.max}
                setMin={(value: number) => setPrice(value, 'min')}
                setMax={(value: number) => setPrice(value, 'max')}
              />
            </Accordion>
          )}
        </>
      )}
    </div>
  )
}
