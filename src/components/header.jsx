import { useTheme } from "@/contextApi/context";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

export const Header = () => {

  const { darkMode, toggleTheme } = useTheme();
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const {user} = useUser()
  const [search, setSearch] = useSearchParams()

  useEffect(()=>{
    if(search.get("sign-in")){
      setShowSignInPopup(true)
    }
  },[search])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignInPopup(false);
      setSearch({})
    }
  };

  return (
    <>
    <section className="max-w-screen-2xl mx-auto">
      <nav className="py-4 px-4 mt-4 flex justify-between rounded-[15px] border-white md:w-[880px] 2xl:w-[1280px] m-auto bg-white/10 items-center">
        <Link to="/">
          <p className="text-[20px] underline hover:text-gray-300 font-extrabold tracking-wide">PROHIRE</p>
        </Link>

        <div className="flex gap-6 items-center">
          <button
            onClick={toggleTheme}
            className="px-6 w-[100px] py-3 rounded-lg text-[14px] font-semibold transition-all duration-300 border border-gray-400 shadow-md 
            hover:shadow-lg hover:scale-105 
            bg-gray-900 text-white dark:bg-gray-900 cursor-pointer dark:text-white"
          >
            {darkMode ? "Dark" : "Light"}
          </button>

          <div className="flex gap-2 items-center">
            <SignedOut>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setShowSignInPopup(true)}
              >
                Login
              </Button>
            </SignedOut>

            <SignedIn>
             { user?.unsafeMetadata?.role === "recruiter" && 
             ( <Link to="/post-job">
                <Button
                  variant="destructive"
                  className="rounded-full flex items-center"
                >
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/my-jobs"
                  />
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<Heart size={15} />}
                    href="/saved-job"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
        </div>
      </nav>

      {showSignInPopup && (
        <div
          className="fixed inset-0 flex shadow-xl items-center justify-center bg-[#1B2634] bg-opacity-50 z-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
      </section>
    </>
  );
};
