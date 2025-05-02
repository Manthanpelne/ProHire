import { useFetch } from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import { ApplicationCard } from './applicationCard';
import { getApplications } from '@/api/apiApplications';

export const CreatedApplications = () => {
    const { user } = useUser();
  
    const {
      loading: loadingApplications,
      data: applications,
      fn: fnApplications,
    } = useFetch(getApplications, {
      user_id: user.id,
    });
  
    useEffect(() => {
      fnApplications();
    }, []);
  
    if (loadingApplications) {
      return <BarLoader className="mb-4" width={"100%"} color="#8309DA" />;
    }

    console.log("application1", applications);
  
    return (
      

      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 md:mt-10 mb-20">
        {applications?.map((application) => {
          return (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate={true}
            />
          );
        })}
      </div>
    );
  };
