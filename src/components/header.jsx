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
         <p>Prohire</p>
      </Link>

      <Button>Login</Button>
    </nav>
    </>
  )
}
