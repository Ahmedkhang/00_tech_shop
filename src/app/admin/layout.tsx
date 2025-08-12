import Link from "next/link";

export default function AdminLayout( {children} :{children:React.ReactNode}){
    return(
        <div className='flex min-h-screen'>
              <aside className="w-64 bg-[#0F172A] p-4 text-white space-y-4">
                <h2 className="text-xl font-bold mb-10">Admin Dashboard!!</h2>
                <nav className='flex flex-col justify-center space-y-2'>
                  <Link className="hover:text-[#22D3EE] duration-300" href='/admin/dashboard'>Dashboard</Link>
                  <Link className="hover:text-[#22D3EE] duration-300" href='/admin/orders'>Orders</Link>
                  <Link className="hover:text-[#22D3EE] duration-300" href='/admin/products'>Products</Link>
                  <Link className="hover:text-[#22D3EE] duration-300" href='/admin/users'>Users</Link>
                </nav>
              </aside>

              <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </div>
    )
}