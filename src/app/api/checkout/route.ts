import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion:'2025-06-30.basil'
})
interface CheckoutItem {
    title:string,
    price:number,
    quantity:number
}
export async function POST(req:Request){
    const items:CheckoutItem[] = await req.json()
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        mode:'payment',
        line_items:items.map((item:CheckoutItem) => ({
            price_data:{
                currency:'usd',
                product_data:{
                    name:item.title
                },
                unit_amount :item.price * 100
            },
            quantity:item.quantity
        })),
        success_url:`${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url:`${process.env.NEXT_PUBLIC_BASE_URL}/cancel`
    })
    return NextResponse.json({url:session.url})
}