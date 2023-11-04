'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Slider({ srcList }: { srcList: string[] }) {
  const [activeSrc, setActiveSrc] = useState<string>(srcList[0])

  return (
    <div className='flex md:flex-col justify-between items-center gap-3 w-full h-[28.5rem] mx-auto'>
      <div className='order-last md:order-first'>
        <Image
          loader={() => activeSrc}
          src={activeSrc}
          width={700}
          height={700}
          alt='main-image'
        />
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center gap-5 w-full overflow-auto'>
        {srcList.map((src, id) => (
          <div key={src} className='relative w-1/5 h-14 rounded-2xl shrink-0'>
            <Image
              onClick={() => setActiveSrc(src)}
              loader={() => src}
              src={src}
              fill
              unoptimized
              alt={`thumbnail-${id + 1}`}
              className={`transform duration-700 rounded-xl border-2 ${
                src === activeSrc
                  ? 'border-store-pri'
                  : 'border-store-outline-faded-max'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
