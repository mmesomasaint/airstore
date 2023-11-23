'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import cookies from 'js-cookie'

type Merchandise = {
  id: string
  quantity: number
  attributes: {
    key: string
    value: string
  }[]
}

type Line = {
  id: string
  merchandiseId: string
  quantity: number
  attributes: {
    key: string
    value: string
  }[]
}

type CartContextType = {
  cartId: string | null
  updateCart: (newMerchandise: Merchandise) => void
  updating: boolean
  latest: Merchandise | null
  size: number
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  size: 0,
  latest: null,
  updating: false,
  updateCart: (newMerchandise: Merchandise) => {
    return
  },
})

export const useCart = () => useContext(CartContext)

export default function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState<boolean>(true)
  const [cartId, setCartId] = useState<string | null>(
    cookies.get('cart_id') ?? null
  )
  const [cartLines, setCartLines] = useState<Line[]>([])

  const updateCart = (newMerchandise: Merchandise) => {
    const idx = cartLines.findIndex(
      (line: Line) => line.merchandiseId === newMerchandise.id
    )

    if (idx === -1) {
    } else {
    }
  }

  const AddLine = (newMerchandise: Merchandise) => {}
  const updateLine = (lineId: string, newMerchandise: Merchandise) => {}

  useEffect(() => {
    if (cartLines.length === 0) return

    if (cartId && cartId !== 'undefined') {
      fetch(`/api/cart/update?cartId=${cartId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartLines }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.body) {
            setCartId(data.body?.id)
            cookies.set('cart_id', data.body?.cartId)
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false))
    } else {
      fetch('/api/cart/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartLines }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.body) {
            setCartId(data.body?.id)
            cookies.set('cart_id', data.body?.cartId, { expires: 7 })
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false))
    }

    setLoading(false)
  }, [cartLines])

  return (
    <CartContext.Provider
      value={{
        cartId,
        updateCart,
        updating: loading,
        latest: cartLines[cartLines.length - 1] ?? null,
        size: cartLines.length,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
