import { countLaptops, countMobiles, countProducts } from "@/sanity/lib/client"
export default async function Dashboard(){
  const products : number = await countProducts() 
  const laptops : number = await countLaptops() 
  const mobiles : number = await countMobiles()
    return(
      <>
      <h1>Products</h1>
      <p>Here you can see the details of your site</p>
    <div className="flex space-x-4">

          <div className="w-[25%] bg-white shadow rounded p-6 text-center">
      <h2 className="text-sm text-gray-500">Total Products</h2>
      <p className="text-3xl font-bold">{products + laptops + mobiles}</p>
    </div>
          <div className="w-[25%] bg-white shadow rounded p-6 text-center">
      <h2 className="text-sm text-gray-500">Laptops</h2>
      <p className="text-3xl font-bold">{laptops + products}</p>
    </div>
          <div className="w-[25%] bg-white shadow rounded p-6 text-center">
      <h2 className="text-sm text-gray-500">Smart Phones</h2>
      <p className="text-3xl font-bold">{mobiles}</p>
    </div>

    </div>
    </>
    )
}