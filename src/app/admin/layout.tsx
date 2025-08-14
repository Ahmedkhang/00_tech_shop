'use client';
import Link from "next/link";
import { useState } from "react";
import { ImCross } from "react-icons/im";
import { RxHamburgerMenu } from "react-icons/rx";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex min-h-screen'>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64  bg-[#0F172A] p-4 text-white flex-col">
        <h2 className="text-xl font-bold mb-10">Admin Dashboard!!</h2>
        <nav className='flex flex-col space-y-4'>
          <Link className="hover:text-[#22D3EE] duration-300 py-2 px-3 rounded transition-colors" href='/admin/dashboard'>
            Dashboard
          </Link>
          <Link className="hover:text-[#22D3EE] duration-300 py-2 px-3 rounded transition-colors" href='/admin/orders'>
            Orders
          </Link>
          <Link className="hover:text-[#22D3EE] duration-300 py-2 px-3 rounded transition-colors" href='/admin/products'>
            Products
          </Link>
          <Link className="hover:text-[#22D3EE] duration-300 py-2 px-3 rounded transition-colors" href='/admin/users'>
            Users
          </Link>
        </nav>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0F172A] text-white p-4 flex justify-between items-center shadow-lg">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className='p-2 rounded-md hover:bg-slate-700 transition-colors'
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {!isOpen ? 
            <RxHamburgerMenu className='text-xl'/> : 
            <ImCross className='text-lg'/>
          }
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Sidebar */}
          <div className='md:hidden fixed top-16 left-0 right-0 bg-[#0F172A] text-white z-50 shadow-lg'>
            <nav className='flex flex-col p-4 space-y-2'>
              <Link 
                href='/admin/dashboard'
                className='hover:text-[#22D3EE] py-3 px-4 rounded transition-colors hover:bg-slate-700'
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href='/admin/orders'
                className='hover:text-[#22D3EE] py-3 px-4 rounded transition-colors hover:bg-slate-700'
                onClick={() => setIsOpen(false)}
              >
                Orders
              </Link>
              <Link 
                href='/admin/products'
                className='hover:text-[#22D3EE] py-3 px-4 rounded transition-colors hover:bg-slate-700'
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
              <Link 
                href='/admin/users'
                className='hover:text-[#22D3EE] py-3 px-4 rounded transition-colors hover:bg-slate-700'
                onClick={() => setIsOpen(false)}
              >
                Users
              </Link>
            </nav>
          </div>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4 md:p-6 pt-20 md:pt-6">
        {children}
      </main>
    </div>
  );
}