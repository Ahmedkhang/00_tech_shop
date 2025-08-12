'use client'
import { useCart } from '@/context/cartcontext';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart()
  const router = useRouter()
  const totalPrice = cart.reduce((sum,item) => sum + item.price * item.quantity,0)
    
  const handleRoute = () => {
        router.push('/checkout')
    }
  
    // If item does not exist, do nothing (since this is a cart page)
    // In a real app, you might want to add the item from a product list
  

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
                 <div className='flex gap-4 items-center'>
                  <Image src={urlFor(item.image).url()} alt = {item.title} width={100} height={100}/>
                    <div>
                       <h1 className='font-bold'>{item.title}</h1>
                       <h3 className=''><span className='font-bold'>Category:</span> {item.category}</h3>
                    </div>
                 </div>
                 <div>
                    <h1 className='font-bold text-center'>${item.price}</h1>
                    <div className='flex gap-3 items-center '>
                        <button onClick={() => removeFromCart(item.id)} className="cursor-pointer hover:scale-130  duration-300 text-red-400 font-bold text-3xl ">-</button>
                        <span className='font-medium mt-1'>{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="cursor-pointer hover:scale-120 duration-300 text-red-500 font-bold text-lg bg-[]">+</button>
                    </div>
                 </div> 
               </div>
                
              </li>
            ))}
          </ul>
          <h1 className='text-lg'><span className='font-bold'>Total:</span>${totalPrice}</h1>
          <div className='flex gap-3'>
            <button 
            onClick={clearCart} 
            className="cursor-pointer hover:scale-110 duration-300 mt-4 bg-red-400 text-white px-4 py-2 rounded"
          >
            Clear Cart
          </button>
          <button onClick={handleRoute} className="cursor-pointer hover:scale-110 duration-300 mt-4 bg-[#0F172A] text-white px-4 py-2 rounded">Order Now</button>
          </div>
        </>
      )}
    </div>
  )
}
