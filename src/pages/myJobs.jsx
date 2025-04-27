import { CreatedApplications } from '@/components/createdApplications';
import { CreatedJobs } from '@/components/createdJobs';
import { useUser } from '@clerk/clerk-react';
import React from 'react'
import { BarLoader } from 'react-spinners';

export const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <section className='max-w-screen-2xl mx-auto'>
    <div className='w-[90%] md:w-[80%] m-auto mt-10 md:mt-20'>
      <h1 className="font-extrabold text-5xl sm:text-7xl text-center pb-8">
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

