import { client } from "@/sanity/lib/client";

export async function POST(req:Request){
    try{
      const data = await req.json()
      const order = {
        _type:'order',
        customer_name:data.customerName,
        email:data.email,
        products:data.products.map((id:string) => ({_type:'reference',_ref:id})),
        total_price:data.totalPrice,
        status:'pending',
        createdAt:new Date().toISOString()
      };
      const result = await client.create(order)
      return new Response(JSON.stringify(result),{status:200})
    }
    catch (error: unknown) {
  if (error instanceof Error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    )
  }

  return new Response(
    JSON.stringify({ error: "Unknown error" }),
    { status: 500 }
  )
}

}