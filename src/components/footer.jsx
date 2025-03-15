import { useTheme } from '@/contextApi/context';
import React from 'react'

export const Footer = () => {
  
  const { darkMode } = useTheme();

  return (
    <>
    <section>
      
      {/* Footer */}
      <footer className={`${darkMode ? "bg-gray-800" : "bg-white"} py-12 mt-[140px]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold  mb-4">For Job Seekers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:">Browse Jobs</a></li>
                <li><a href="#" className="text-gray-400 hover:">Career Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:">Resume Tips</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold  mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:">Post a Job</a></li>
                <li><a href="#" className="text-gray-400 hover:">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:">Employer Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold  mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold  mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-center">© 2025 JobHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
    </>
  )
}
