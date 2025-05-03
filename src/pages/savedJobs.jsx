import { getSavedJobs } from '@/api/apiJobs';
import { JobCard } from '@/components/jobCard';
import { useFetch } from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';

export const SavedJobs = () => {

  const { isLoaded } = useUser();

  const {
    fn: fnSavedJobs,
    data: savedJobs,
    loading: loadingSavedJobs,
  } = useFetch(getSavedJobs);


  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);


  return (
    <section className='max-w-screen-2xl mx-auto mb-20'>

      <h1 className='font-extrabold text-4xl md:text-6xl text-center mt-28 md:mt-30'>Saved Jobs</h1>

      {loadingSavedJobs &&
       <BarLoader className="m-auto my-2" width={"80%"} color="#8309da" /> }
  
  {loadingSavedJobs === false && (
  <div className="w-[90%] m-auto mt-12"> {/* Remove the grid classes */}
    {savedJobs?.length ? (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"> {/* Add grid back here */}
        {savedJobs?.map((saved) => (
          <JobCard
              key={saved.id}
              job={saved?.job}
              onJobSaved={fnSavedJobs}
              savedInit={true}
            />
        ))}
      </div>
    ) : (
      <div className='text-center m-auto mt-10 flex justify-center items-center flex-col'> {/* Make this a flex container */}
        <img className='m-auto w-sm' src="/emptySavedJobs.png" alt="" />
        <h2 className='font-bold text-xl text-[gray]'>No Jobs Found</h2>
      </div>
    )}
  </div>
)}
  
    </section>
  )
}
