import { getJobs } from '@/api/apiJobs'
import { useFetch } from '@/hooks/use-fetch'
import { useSession } from '@clerk/clerk-react'
import React, { useEffect } from 'react'

export const JobListing = () => {

  const {
    fetchData : fetchjobs, 
    data : dataJobs,
    loading : loadingJobs,
  } = useFetch(getJobs, {})

  console.log(dataJobs)

  useEffect(() => {
    fetchjobs()
  }, [])
  

  return (
    <div>my job</div>
  )
}
