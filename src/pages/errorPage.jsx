import { Link } from 'react-router-dom'
import React from 'react'

export const ErrorPage = () => {
  return (
     <section>
     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Oops! Something went wrong.
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            We can't seem to find the page you're looking for.
          </p>
        </div>

        <div className="text-center">
          <img
            src="/public/error.png"
            alt="Page Not Found"
            className="mx-auto h-60 w-auto"
          />
        </div>

        <div className="text-center">
          <Link to="/" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 active:scale-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Go back to homepage
          </Link>
        </div>
      </div>
    </div>
     </section>
  )
}
