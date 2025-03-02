import { useTheme } from '@/contextApi/context';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const Header = () => {
  
  return (
    <>
    <nav className='py-4 flex justify-between items-center'>
      <Link>
         <img src="/" alt="" />
         <p className='text-[20px] text-red-600 font-extrabold tracking-wide'>PROHIRE</p>
      </Link>

      <Button variant="outline">Login</Button>
    </nav>
    </>
  )
}
