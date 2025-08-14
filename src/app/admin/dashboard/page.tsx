export const dynamic = "force-dynamic"; // prevents static rendering
import { getSalesByDate, getOrdersByStatus, getTopProducts } from '@/sanity/lib/sanityClient';
import SalesCharts from '@/components/SalesCharts';
import { CountUsers } from "@/lib/clerkClient"
import { countLaptops, countMobiles, countProducts, LaptopStocks } from "@/sanity/lib/client"
export default async function Dashboard(){
  const users:number =await CountUsers()
  const products : number = await countProducts() 
  const laptops : number = await countLaptops() 
  const mobiles : number = await countMobiles()
  const TotalStocks : number = await LaptopStocks()

  const salesByDate = await getSalesByDate();
  const ordersByStatus = await getOrdersByStatus();
  const topProducts = await getTopProducts();

    return(
      <>
      <h1 className='font-bold mb-5 text-2xl'>Welcome to Dashboard</h1>
      {/* <p>Here you can see the details of your site</p> */}
    <div className="flex space-x-4">

          <div className="w-[30%] bg-white shadow rounded p-6 text-center">
      <h2 className="text-sm text-gray-500">Total Products</h2>
      <p className="text-3xl font-bold">{products + laptops + mobiles}</p>
    </div>

          <div className="w-[30%] bg-white shadow rounded p-6 text-center">
      <h2 className="text-sm text-gray-500">Total Users</h2>
      <p className="text-3xl font-bold">{users}</p>
    </div>
          <div className="w-[30%] bg-white shadow rounded p-6 text-center">
      <h2 className="text-sm text-gray-500">Total Stock</h2>
      <p className="text-3xl font-bold">{TotalStocks}</p>
    </div>
    
    </div>
    <div className="mt-10">

    <SalesCharts
      salesByDate={salesByDate}
      ordersByStatus={ordersByStatus}
      topProducts={topProducts}
    />
  


    </div>
    </>
    )
}