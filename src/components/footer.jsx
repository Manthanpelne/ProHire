import { useTheme } from '@/contextApi/context';
import React from 'react'

export const Footer = () => {
  
  const { darkMode } = useTheme();

  return (
    <>
    <section>
      
      {/* Footer */}
      <footer className={`${darkMode ? "bg-black/60" : "bg-[#DDDBDB]"} py-12 mt-[140px]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold  mb-4">For Job Seekers</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className=" hover:">Browse Jobs</a></li>
                <li><a href="#" className=" hover:">Career Resources</a></li>
                <li><a href="#" className=" hover:">Resume Tips</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold  mb-4">For Employers</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className=" hover:">Post a Job</a></li>
                <li><a href="#" className=" hover:">Pricing</a></li>
                <li><a href="#" className=" hover:">Employer Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold  mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className=" hover:">About Us</a></li>
                <li><a href="#" className=" hover:">Contact</a></li>
                <li><a href="#" className=" hover:">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold  mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li><a href="#" className=" hover:">Privacy Policy</a></li>
                <li><a href="#" className=" hover:">Terms of Service</a></li>
                <li><a href="#" className=" hover:">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t-[1px] border-gray-400 dark:border-[#2e2c2c]">
            <p className=" text-center text-gray-600 dark:text-gray-400">© 2025 JobHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
    </>
  )
}
