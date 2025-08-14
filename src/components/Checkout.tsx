'use client';
import { useCart } from '@/context/cartcontext'
import { useRouter } from 'next/navigation'
import React from 'react'

const Checkout = () => {
  const {cart, clearCart} = useCart()
  const router = useRouter() 

  const totalPrice = cart.reduce((sum,item) => sum + item.price * item.quantity,0)

  const handleCheckout = async () => {
    const res = await fetch('api/checkout',{
      method:'POST',
      body:JSON.stringify(cart)
    })
    const data = await res.json()
    window.location.href = data.url;
    alert('Order Submitted Successfully!!')
    clearCart()
    router.push('/thanks')
  }
  return (
       <div className="max-w-3xl mx-auto p-6">

      
      {cart.length === 0 ? (<p>Your Cart is Empty</p>):(
          
                  <>
          <div className="border rounded-lg p-4 shadow-sm mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b py-3">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Total</h2>
            <h2 className="text-xl font-semibold">${totalPrice}</h2>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
          >
            Confirm & Pay
          </button>
        </>
      )
      
      }
    </div>
  )
}

export default Checkout