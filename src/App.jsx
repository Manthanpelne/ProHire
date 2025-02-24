
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
import { Ecom } from './ecom'


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
        element: <Onboarding/>
      },
      {
        path: "/jobs",
        element: <JobListing/>
      },
      {
        path: "/jobs/:id",
        element: <JobPage/>
      },
      {
        path: "/post-job",
        element: <PostJob/>
      },
      {
        path: "/saved-job",
        element: <SavedJobs/>
      },
      {
        path: "/my-jobs",
        element: <MyJobs/>
      },
      {
        path: "/ecom",
        element: <Ecom/>
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
