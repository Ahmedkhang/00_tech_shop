'use client';
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Image from 'next/image'
import Link from 'next/link';
const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false)
  return (
    <>
    <nav className='w-screen h-20 bg-[#0F172A] text-white flex justify-between'>

        <div className='w-[20%] p-2  '>
            <Image src='/logo.png' alt='Tech Shop Logo' width={100} height={60} className='rounded-full h-15 md:h-18' />
        </div>

        <div className='w-[60%] hidden md:flex justify-center items-center h-full '>
            <ul className='hidden md:flex gap-3 text-white'>
                <li className='hover:text-[#22D3EE]'>Home</li>
                <li className='hover:text-[#22D3EE]'>Products</li>
                <li className='hover:text-[#22D3EE]'>Contact</li>
                <li className='hover:text-[#22D3EE]'>About us</li>
            </ul>
        </div>


        <div className='w-[20%] flex gap-3 justify-end items-center mr-4'>
            <span><FaUser /></span>
            <Link href="/cart"><span><FaShoppingCart /></span></Link>
            <button onClick={() => setIsOpen(!isOpen)} className='md:hidden'>
             {!isOpen ? <RxHamburgerMenu className='font-extrabold text-xl'/>:<ImCross />}
            </button>
        </div>

    </nav>
    {/* Mob Menu */}
    {isOpen &&(
      <div className='md:hidden w-screen flex justify-center items-center h-35 bg-[#0F172A] text-white'>
        <ul >
            <li className='hover:text-[#22D3EE]'>Home</li>
            <li className='hover:text-[#22D3EE]'>Products</li>
            <li className='hover:text-[#22D3EE]'>Contact</li>
            <li className='hover:text-[#22D3EE]'>About us</li>
        </ul>
      </div>
    )}
    </>
  )

}

export default Navbar
