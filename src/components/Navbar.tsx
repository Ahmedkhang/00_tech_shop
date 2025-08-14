'use client';
import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Navbar = () => {
    const [isOpen,setIsOpen] = useState(false)
    const router = useRouter()

    const handleSignInButton = () => {
      router.push(
        '/sign-in'
      )
    }

  return (
    <>
    <nav className='w-full h-20 bg-[#0F172A] text-white flex justify-between'>

        <div className='w-[20%] p-2  '>
           <Link href='/'> <Image src='/logo.png' alt='Tech Shop Logo' width={100} height={60} className='rounded-full h-15 md:h-18' /></Link>
        </div>

        <div className='w-[60%] hidden md:flex justify-center items-center h-full '>
            <ul className='hidden md:flex gap-3 text-white'>
                <Link href='/'><li className='hover:text-[#22D3EE]'>Home</li></Link>
                <Link href='/laptops'><li className='hover:text-[#22D3EE]'>Laptops</li></Link>
                <Link href='/mobiles'><li className='hover:text-[#22D3EE]'>Phones</li></Link>
                <Link href='/contact'><li className='hover:text-[#22D3EE]'>Contact</li></Link>
                <Link href='/about'><li className='hover:text-[#22D3EE]'>About us</li></Link>
            </ul>
        </div>


        <div className='w-[20%] flex gap-3 justify-end items-center mr-4'>

            <span className='cursor-pointer'><FaUser onClick={handleSignInButton} /></span>

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
            <Link href='/'><li className='hover:text-[#22D3EE]'>Home</li></Link>
           <Link href='/laptop'> <li className='hover:text-[#22D3EE]'>Products</li></Link>
            <Link href='/contact'><li className='hover:text-[#22D3EE]'>Contact</li></Link>
           <Link href='/about'> <li className='hover:text-[#22D3EE]'>About us</li></Link>
        </ul>
      </div>
    )}
    </>
  )

}

export default Navbar
