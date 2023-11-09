import {createContext} from 'react'

type CartContextType = {
  cartId: string | null
}

export const CartContext = createContext<CartContextType>({cartId: null})