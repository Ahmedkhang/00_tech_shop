'use client'
import { useCart } from '@/context/cartcontext';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()
  const totalPrice = cart.reduce((sum,item) => sum + item.price * item.quantity,0)
    

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-3 border-b pb-2">
               <div className='w-full flex justify-between items-center '>
                 <div><Image src={urlFor(item.image).url()} alt = {item.title} width={100} height={100}/></div>
                 <div>
                    <h1 className='font-bold text-center'>${item.price}</h1>
                    <div className='flex gap-3'>
                        <button onClick={() => removeFromCart(item.id)} className="text-white font-bold text-xl bg-red-400 ">-</button>
                        <button onClick={() => addToCart(item.id)} className="text-red-500 font-bold text-lg bg-[]">+</button>
                    </div>
                 </div> 
               </div>
                
              </li>
            ))}
          </ul>
          <h1>{totalPrice}</h1>
          <button 
            onClick={clearCart} 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  )
}
