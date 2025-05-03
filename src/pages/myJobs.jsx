import { CreatedApplications } from '@/components/createdApplications';
import { CreatedJobs } from '@/components/createdJobs';
import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { BarLoader } from 'react-spinners';

export const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#8309da" />;
  }

  return (
    <section className='max-w-screen-2xl mx-auto pb-20'>
    <div className='w-[90%] m-auto mt-28 md:mt-30'>
      <h1 className="font-extrabold text-3xl md:text-5xl  text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
    
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  </section>
  );
};

