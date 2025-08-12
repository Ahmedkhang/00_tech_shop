import Checkout from '@/components/Checkout'
import React from 'react'

import { currentUser } from '@clerk/nextjs/server';

const CheckoutPage = async() => {
  
  const user = await currentUser()
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <p>Welcome,{user?.username}</p>
      <Checkout />
    </>
  )
}

export default CheckoutPage;