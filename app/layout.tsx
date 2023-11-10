import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import cookies from 'js-cookie'
import CartProvider from './context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airstore',
  description: 'Apple gadgets online retail store',
}

let cartId = cookies.get('cart_id')
if (!cartId) {
  cartId = ''
  cookies.set('cart_id', cartId, { expires: 1 })
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
