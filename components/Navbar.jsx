"use client"
import React, { useState } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import Cart from "@/app/cart/page";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const {openSignIn} = useClerk()
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/all-products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 text-gray-700">
        {/* Logo */}
        <Image
          className="cursor-pointer w-28 md:w-32 hover:opacity-80 transition-opacity"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/" className="hover:text-orange-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-orange-600 transition-colors font-medium">
            Shop
          </Link>
          <Link href="/" className="hover:text-orange-600 transition-colors font-medium">
            About Us
          </Link>
          <Link href="/" className="hover:text-orange-600 transition-colors font-medium">
            Contact
          </Link>
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-64 px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    autoFocus
                  />
                  <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  type="button"
                  onClick={() => {setIsSearchOpen(false); setSearchQuery("");}}
                  className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                title="Search"
              >
                <svg 
                  className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Search */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Search"
          >
            <svg 
              className="w-5 h-5 text-gray-600"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Seller Dashboard Button */}
          {isSeller && (
            <button 
              onClick={() => router.push('/seller')} 
              className="hidden md:block text-xs bg-orange-100 text-orange-700 border border-orange-200 px-4 py-2 rounded-full hover:bg-orange-200 transition-colors font-medium"
            >
              Seller Dashboard
            </button>
          )}

          {/* User Account */}
          <div className="flex items-center">
            {user ? (
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                </UserButton.MenuItems>
              </UserButton>
            ) : (
              <button 
                onClick={openSignIn} 
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors font-medium"
              >
                <Image src={assets.user_icon} alt="user icon" className="w-4 h-4 filter brightness-0 invert" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Seller Dashboard */}
          {isSeller && (
            <button 
              onClick={() => router.push('/seller')} 
              className="md:hidden text-xs bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-full font-medium"
            >
              Seller
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-6 pb-4 border-t border-gray-100 bg-gray-50">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoFocus
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors font-medium"
            >
              Search
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Menu - You can add this if needed */}
      <div className="lg:hidden px-6 py-2 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
            Home
          </Link>
          <Link href="/all-products" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
            Shop
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
            About
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;