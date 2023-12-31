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
  notEmptyCart: boolean
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  notEmptyCart: false,
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
      if (cartId && cartId !== 'undefined') addLine(newMerchandise)
      else createCart(newMerchandise)
    } else updateLine(cartLines[idx].id, newMerchandise)
  }

  const fetchCart = () => {
    fetch(`/api/cart/mini?cartId=${cartId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.body) {
          setCartLines(data.body.cartLines)
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }

  const addLine = (newMerchandise: Merchandise) => {
    fetch(`/api/cart/addLine?cartId=${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lines: [newMerchandise] }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.body) {
          setCartLines(data.body?.cartLines)
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }

  const updateLine = (lineId: string, newMerchandise: Merchandise) => {
    const lines = {
      merchandiseId: newMerchandise.id,
      ...newMerchandise,
      id: lineId,
    }

    fetch(`/api/cart/updateLine?cartId=${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lines }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.body) {
          setCartLines(data.body.cartLines)
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }

  const createCart = (newMerchandise: Merchandise) => {
    fetch('/api/cart/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lines: [newMerchandise] }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.body) {
          setCartId(data.body?.id)
          setCartLines(data.body?.cartLines)
          cookies.set('cart_id', data.body?.id, { expires: 7 })
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (cartId) {
      fetchCart()
    }
  }, [cartId])

  return (
    <CartContext.Provider
      value={{
        cartId,
        updateCart,
        updating: loading,
        latest: cartLines[cartLines.length - 1] ?? null,
        notEmptyCart: cartLines.length > 0,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
