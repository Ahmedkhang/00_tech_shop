'use client';
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white w-full py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo and Description */}
        <div>
          <h1 className="text-xl font-bold mb-2">Tech Shop</h1>
          <p className="text-sm text-gray-300">Your one-stop tech store for latest gadgets and accessories.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold mb-3 text-[#22D3EE]">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-[#22D3EE] cursor-pointer">Home</li>
            <li className="hover:text-[#22D3EE] cursor-pointer">Products</li>
            <li className="hover:text-[#22D3EE] cursor-pointer">Contact</li>
            <li className="hover:text-[#22D3EE] cursor-pointer">About Us</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold mb-3 text-[#22D3EE]">Contact</h2>
          <p className="text-sm text-gray-300">Email: support@techshop.com</p>
          <p className="text-sm text-gray-300">Phone: +92 300 1234567</p>
          <p className="text-sm text-gray-300">Location: Karachi, Pakistan</p>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="font-semibold mb-3 text-[#22D3EE]">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <FaFacebook className="hover:text-[#22D3EE] cursor-pointer" />
            <FaTwitter className="hover:text-[#22D3EE] cursor-pointer" />
            <FaInstagram className="hover:text-[#22D3EE] cursor-pointer" />
            <FaLinkedin className="hover:text-[#22D3EE] cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Tech Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
