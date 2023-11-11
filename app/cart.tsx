'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import cookies from 'js-cookie'
import Loading from '@/theme/components/loading'

type Merchandise = {
  id: string
  quantity: number
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
  const [cartLines, setCartLines] = useState<Merchandise[]>([])

  const updateCart = (newMerchandise: Merchandise) => {
    const idx = cartLines.findIndex(
      (merchandise: Merchandise) => merchandise.id === newMerchandise.id
    )

    if (idx === -1) setCartLines([...cartLines, newMerchandise])
    else {
      const newCartLines = [...cartLines]
      newCartLines[idx] = newMerchandise
      setCartLines(newCartLines)
    }
  }

  useEffect(() => {
    if (cartLines.length > 0) {
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
            setCartId(data.body?.cartId)
            setCartLines(data.body?.cartLines)
            cookies.set('cart_id', data.body?.cartId)
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
      {loading ? <Loading /> : children}
    </CartContext.Provider>
  )
}
