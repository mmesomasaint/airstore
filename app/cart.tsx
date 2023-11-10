'use client'

import React, { createContext, useContext } from 'react'

type CartContextType = {
  cartId: string | null
}

const CartContext = createContext<CartContextType>({ cartId: null })

export const useCart = () => useContext(CartContext)

export default function CartProvider({children}: {children: React.ReactNode}) {
  return (
    <CartContext.Provider value={{cartId: null}}>
      {children}
    </CartContext.Provider>
  )
}
