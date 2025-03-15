
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './layouts/appLayout'
import { LandingPage } from './pages/landingPage'
import { JobListing } from './pages/jobListing'
import { JobPage } from './pages/jobPage'
import { PostJob } from './pages/postJob'
import { SavedJobs } from './pages/savedJobs'
import { MyJobs } from './pages/myJobs'
import { Onboarding } from './pages/onboarding'
import { ProtectedRoute } from './components/protected-route'



const router = createBrowserRouter([
  {
    element : <AppLayout/>,
    children :[
      {
        path: "/",
        element: <LandingPage/>
      },
      {
        path: "/onboarding",
        element:(
          <ProtectedRoute>
            <Onboarding/>
          </ProtectedRoute>
        )
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing/>
          </ProtectedRoute>
        )
      },
      {
        path: "/jobs/:id",
        element: (
          <ProtectedRoute>
            <JobPage/>
          </ProtectedRoute>
        )
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob/>
          </ProtectedRoute>
        )
      },
      {
        path: "/saved-job",
        element:(
          <ProtectedRoute>
            <SavedJobs/>
          </ProtectedRoute>
        )
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobs/>
          </ProtectedRoute>
        )
      }
    ]
  }
])

function App() {

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
