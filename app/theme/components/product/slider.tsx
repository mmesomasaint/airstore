'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Slider({ srcList }: { srcList: string[] }) {
  const [activeSrc, setActiveSrc] = useState<string>(srcList[0])

  return (
    <div className='flex md:flex-col justify-between items-center gap-3 w-full h-[27rem] mx-auto'>
      <div className='order-last md:order-first'>
        <Image src={activeSrc} width={700} height={700} alt='main-image' />
      </div>
      <div className='flex flex-col md:flex-row justify-evenly items-center gap-4 w-full'>
        {srcList.map((src, id) => (
          <div key={src} className='relative w-1/4 h-14 rounded-2xl'>
            <Image
              onClick={() => setActiveSrc(src)}
              src={src}
              fill
              alt={`thumbnail-${id + 1}`}
              className={`transform duration-700 rounded-xl border-2 ${
                src === activeSrc
                  ? 'border-apple-store-pri'
                  : 'border-apple-store-outline-faded-max'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
