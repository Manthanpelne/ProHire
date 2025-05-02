import { Link, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import {
  Search,
  ArrowRight,
  Building2,
  UserCheck,
  Cross,
  CrossIcon,
  SidebarCloseIcon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { HowItWorks } from "@/components/howItWorks";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import { useUser } from "@clerk/clerk-react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";

export const LandingPage = () => {
  const { user } = useUser();

  const [showNotRecruiterAlert, setShowNotRecruiterAlert] = useState(false);

  const handlePostJob = () => {
    if (user?.unsafeMetadata?.role !== "recruiter") {
      setShowNotRecruiterAlert(true);
      return; // Prevent navigation for non-recruiters
    } else {
      window.location.href = "/post-job";
      // Programmatically navigate when the user is a recruiter
    }
  };

  return (
    <>
      {showNotRecruiterAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <Alert
            variant="destructive"
            className="bg-[#faf8f8] dark:bg-[#ebe5e5]  shadow-lg rounded-lg"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="text-white flex items-center gap-5">
              You need to be a recruiter to post a job
              <Button
                className="border cursor-pointer px-5 py-1 text-black bg-white dark:bg-black dark:text-white hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setShowNotRecruiterAlert(false)}
                size={20}
              >
                Close
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <section className="py-28 md:py-30 bg-gradient-to-br from-blue-50 to-indigo-50 dark:bg-gradient-to-br dark:from-[black]/30 dark:to-[black]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-[#bab9b9] leading-tight mb-6">
                Find the <span className="text-blue-600">perfect match</span>{" "}
                for your career
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8  max-w-xl">
                Connect with top employers and candidates on our innovative
                hiring platform designed to streamline the recruitment process.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={handlePostJob}
                  className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 active:scale-95 shadow-md font-medium flex items-center justify-center"
                >
                  <Building2 className="mr-2" size={20} />
                  Post a Job
                  <ArrowRight className="ml-2" size={18} />
                </button>

                <Link to="/jobs">
                  <button className="px-6 py-3 w-full cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all btnStyle shadow-xl font-medium flex items-center justify-center">
                    <UserCheck className="mr-2" size={20} />
                    Find a Job
                    <ArrowRight className="ml-2" size={18} />
                  </button>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="bg-white dark:bg-[black] p-6 rounded-2xl shadow-xl max-w-lg mx-auto transform transition-all hover:scale-105 duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-[gray]/20 rounded-lg">
                    <Search size={20} className="text-gray-400 dark:text-gray-600 mr-3" />
                    <input
                      type="text"
                      placeholder="Search for jobs, skills, or companies"
                      className="bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-600 w-full focus:outline-none text-gray-700"
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Senior Web Developer",
                      company: "Acme Inc",
                      location: "New York, NY",
                      type: "Full-time",
                    },
                    {
                      title: "UX Designer",
                      company: "TechStart",
                      location: "Remote",
                      type: "Contract",
                    },
                    {
                      title: "Product Manager",
                      company: "Innovate Labs",
                      location: "San Francisco, CA",
                      type: "Full-time",
                    },
                  ].map((job, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-100 dark:border-[#3a3636] rounded-2xl hover:bg-blue-50 dark:hover:bg-[gray]/10 transition-colors cursor-pointer"
                    >
                      <h3 className="font-medium text-gray-900 dark:text-gray-400">{job.title}</h3>
                      <p className="text-gray-600 dark:text-gray-500 text-sm">
                        {job.company} • {job.location}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 dark:bg-[#363131] text-blue-700 dark:text-blue-400 rounded-full">
                          {job.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          Posted 2d ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:block absolute -top-4 -left-4 w-20 h-20 bg-[#8309da] rounded-full opacity-20"></div>
              <div className="hidden md:block absolute -bottom-8 -right-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto">
        {/* how it works section */}
        <HowItWorks />

        <div>
          <Carousel
            className="px-4 sm:px-6 lg:px-8 z-10 m-auto py-10 md:py-20"
            plugins={[Autoplay({ delay: 2000 })]}
          >
            <CarouselContent className="flex items-center gap-5 sm:gap-20 px-1">
              {companies.map(({ name, id, path }) => {
                return (
                  <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                    <img
                      className="h-9 sm:h-14 object-contain"
                      src={path}
                      alt={name}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Features Section */}
        <Features />

        {/* Testimonials */}
        <Testimonials />

        {/* Pricing Section */}
        <Pricing />
      </section>
    </>
  );
};
