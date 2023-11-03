import { Filter } from '@/lib/filter'
import { HR } from '../elements/rule'
import Accordion from './accordion'
import CheckBox from './checkbox'
import Range from './range'

export default function Filter({
  filter,
  setCategory,
  setColor,
  setPrice,
  setDateAdded,
}: {
  filter: Filter
  setCategory: (value: boolean, category: string) => void
  setColor: (value: boolean, color: string) => void
  setPrice: (value: number, price: string) => void
  setDateAdded: (value: boolean, dateAdded: string) => void
}) {
  return (
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
  )
}
