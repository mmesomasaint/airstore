import {createContext} from 'react'

type CartContextType = {
  cartId: string | null
}

const CartContext = createContext<CartContextType>({cartId: null})

export default CartContext