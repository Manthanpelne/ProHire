import { useTheme } from '@/contextApi/context';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/clerk-react';
import { PenBox } from 'lucide-react';

export const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [showSignInPopup, setShowSignInPopup] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignInPopup(false);
    }
  };

  return (
    <>
      <nav className='py-4 px-4 mt-4 flex justify-between w-full rounded-[15px] md:w-[90%] 2xl:w-[1380px] m-auto bg-white/10 items-center'>
        <Link to="/">
          <p className='text-[20px] font-extrabold tracking-wide'>PROHIRE</p>
        </Link>

        <div className='flex gap-2 items-center'>
          <button
            onClick={toggleTheme}
            className="px-6 w-[100px] py-3 rounded-lg text-[14px] font-semibold transition-all duration-300 border border-gray-400 shadow-md 
            hover:shadow-lg hover:scale-105 
            bg-gray-900 text-white dark:bg-gray-900 cursor-pointer dark:text-white"
          >
            {darkMode ? "Dark" : "Light"}
          </button>

          <div className='flex gap-2 items-center'>
            <SignedOut>
              <Button variant="outline" className="cursor-pointer" onClick={() => setShowSignInPopup(true)}>
                Login
              </Button>
            </SignedOut>
            <SignedIn>
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full flex items-center">
                  <PenBox size={20} className='mr-2' />
                  Post a Job
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </nav>

      {showSignInPopup && (
        <div className='fixed inset-0 flex shadow-xl items-center justify-center bg-[#1B2634] bg-opacity-50 z-50' onClick={handleOverlayClick}>
            <SignIn signUpForceRedirectUrl="/onboarding" fallbackRedirectUrl="/onboarding" />
        </div>
      )}
    </>
  );
};
