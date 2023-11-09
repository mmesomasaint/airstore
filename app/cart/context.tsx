import { createContext, useContext } from 'react'

type CartContextType = {
  cartId: string | null
}

const CartContext = createContext<CartContextType>({ cartId: null })

export const useCart = () => useContext(CartContext)

export default CartContext
