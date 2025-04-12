import { getJobs } from "@/api/apiJobs";
import { JobCard } from "@/components/jobCard";
import { useFetch } from "@/hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export const JobListing = () => {
  const { searchQuery, setSearchQuery } = useState("");
  const { company_id, setCompany_id } = useState("");
  const { location, setLocation } = useState("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  console.log("jobs",jobs);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="font-extrabold text-4xl md:text-6xl text-center mt-10 md:mt-20">
        Latest Jobs
      </h1>

      {/* all filters here */}

      {loadingJobs && (
        <BarLoader className="m-auto mt-4" width={"50%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="w-[90%] md:w-[80%] m-auto mt-[50px] md:mt-[80px] grid grid-cols-1 md:grid-cols-2  gap-6 md:gap-20">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center mt-10">
              <h1 className="font-bold text-2xl">No Jobs Found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
