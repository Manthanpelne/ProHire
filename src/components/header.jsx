import { useTheme } from '@/contextApi/context';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export const Header = () => {
  const {darkMode, toggleTheme} = useTheme()
  return (
    <>
    <nav className='py-4 px-4 mt-4 flex justify-between w-full rounded-[15px] md:w-[90%] 2xl:w-[1380px] m-auto bg-white/10 items-center'>
      <Link>
         <img src="/" alt="" />
         <p className='text-[20px] font-extrabold tracking-wide'>PROHIRE</p>
      </Link>

      <div className='flex gap-2 items-center'>
      <Button variant="outline">Login</Button>
      <button
        onClick={toggleTheme}
        className=" px-6 w-[100px] py-3 rounded-lg text-[14px] font-semibold transition-all duration-300 border border-gray-400 shadow-md 
                     hover:shadow-lg hover:scale-105 
                     bg-gray-900 text-white dark:bg-gray-900 cursor-pointer dark:text-white"
      > {darkMode?"Dark":"Light"}
      </button>
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
    </div>
    </nav>
    </>
  )
}
