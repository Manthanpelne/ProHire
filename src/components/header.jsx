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
import { BriefcaseBusiness, Heart, Menu, PenBox, Users, X } from "lucide-react";
import NavLink from "./navlink";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { darkMode, toggleTheme } = useTheme();
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const { user } = useUser();
  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignInPopup(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignInPopup(false);
      setSearch({});
    }
  };

  //for smooth scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white dark:bg-black/80  shadow-md py-5"
            : "bg-transparent text-gray-800 border-b border-[transparent] dark:border-[#4c4848] dark:text-white py-5"
        }`}
      >
        <div className="flex items-center w-[90%] md:w-full m-auto">
          <div className="container flex justify-between items-center mx-auto sm:px-6 lg:px-8">
            <Link to="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <Users size={24} />
                <p className="text-[20px] transition-all duration-200 active:scale-90 hover:text-blue-400 dark:hover:text-blue-400 font-extrabold tracking-wide">
                  PROHIRE
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="#testimonials">Testimonials</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
            </nav>

            <div className="flex gap-6 items-center">
                  <label class="ui-switch">
                    <input onClick={toggleTheme} type="checkbox"/>
                    <div class="slider">
                      <div class="circle"></div>
                    </div>
                  </label>

              <div className="flex gap-4 items-center">
                <SignedOut>
                  <Button
                    variant="outline"
                    className="cursor-pointer btnStyle text-white hover:text-white"
                    onClick={() => setShowSignInPopup(true)}
                  >
                    Login
                  </Button>
                </SignedOut>

                <SignedIn>
                  {user?.unsafeMetadata?.role === "recruiter" && (
                    <div className="hidden md:block">
                    <Link to="/post-job">
                      <Button
                        className="rounded-lg dark:text-white btnStyle flex items-center"
                      >
                        <PenBox size={20} className="mr-2" />
                        Post a Job
                      </Button>
                    </Link>
                    </div>
                  )}
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-16 h-16",
                      },
                    }}
                  >
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label={
                          user?.unsafeMetadata?.role === "recruiter"
                            ? "My Jobs"
                            : "My Applications"
                        }
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
          </div>
        </div>
      </header>
    </>
  );
};
