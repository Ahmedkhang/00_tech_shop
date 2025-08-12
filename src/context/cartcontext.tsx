'use client'
import { createContext } from "react";
import { Product_types } from "../../types";
import { Children, ReactNode, useContext, useEffect, useState } from "react";
// import Error from "next/error";

type CartItem = Product_types & {quantity:number}

interface cartContentInterface {
    cart:CartItem[]
    addToCart:(product:Product_types) => void
    removeFromCart:(id:string) => void
    clearCart:() => void
}

const CartContext = createContext<cartContentInterface | undefined>(undefined)

export const CartProvider = ({children}:{children:ReactNode}) => {
  const [cart,setCart] = useState<CartItem[]>([])
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if(storedCart){
        setCart(JSON.parse(storedCart))
    }
  },[])

  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])

  const addToCart = (product:Product_types) => {
      setCart((prevCart) => {
        const existing = prevCart.find(item => item.id === product.id)
        if(existing){
            return prevCart.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1} : item
            )
        }
        else{
          return [...prevCart, {...product,quantity:1}]
        }
      })
  }

  const removeFromCart = (productId:string) => {
       setCart(prev => {
        return prev.map(item => {
          if(item.id === productId){
            if(item.quantity > 1){
              return {...item,quantity:item.quantity - 1}
            }
            else{
              return null
            }
          }
          return item
        }
        
      )
      .filter(item => item !== null) as CartItem[]
    })
  }

  const clearCart = () => {
    setCart([])
  }

  return(
    <CartContext.Provider value={{cart,addToCart,removeFromCart,clearCart}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = ():cartContentInterface => {
  const context = useContext(CartContext)
  if(!context) throw new Error('useCart must be used within a CartProvider')
  return context
} 