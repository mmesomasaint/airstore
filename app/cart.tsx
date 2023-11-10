'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import cookies from 'js-cookie'
import Loading from '@/theme/components/loading'

type CartContextType = {
  cartId: string | null
}

const CartContext = createContext<CartContextType>({ cartId: null })

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

  useEffect(() => {
    if (!cartId) {
      fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.body) {
            setCartId(data.body)
            cookies.set('cart_id', data.body)
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false))
    }

    setLoading(false)
  }, [])

  return (
    <CartContext.Provider value={{ cartId }}>
      {loading ? <Loading /> : children}
    </CartContext.Provider>
  )
}
