import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import { JobCard } from "@/components/jobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/use-fetch";
import { useSession, useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [location, setLocation] = useState("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data:companies } = useFetch(getCompanies);


  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  

  function handleSearch(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  }

  const clearFilters = ()=>{
    setCompany_id("")
    setSearchQuery("")
    setLocation("")
  }

  return (
    <div>
      <h1 className="font-extrabold text-4xl md:text-6xl text-center mt-10 md:mt-20">
        Latest Jobs
      </h1>

      {/* all filters here */}
      <form
        onSubmit={handleSearch}
        className="flex w-[80%] m-auto items-center gap-3 mt-10"
      >
        <Input
          type="text"
          placeholder="search Jobs by Title..."
          name="search-query"
          className="h-full py-3 dark:border-[#5a5959] bg-[#9d98a2]/10 dark:bg-black/60 flex-1 px-4 text-md"
        />
        <Button
          type="submit"
          className="h-full shadow-xl py-3 px-20 md:w-28  bg-[#514f4f] hover:bg-black text-white dark:bg-[#9d98a2]/30 dark:hover:bg-[#9d98a2]/20 cursor-pointer"
        >
          Search
        </Button>
      </form>

      <div className="w-[80%] m-auto mt-5 flex flex-col items-center sm:flex-row gap-4">
        <Select value={location} onValueChange={(value)=>setLocation(value)}>
          <SelectTrigger className="border-[1px] py-5 bg-[#9d98a2]/10  dark:border-[#5a5959]">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
              <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
              </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="border-[1px] py-5 bg-[#9d98a2]/10  dark:border-[#5a5959]">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
          <SelectGroup>
              {companies?.map(({ name,id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
              </SelectGroup>
          </SelectContent>
        </Select>
        <Button onClick={clearFilters}
          className="px-10.5 shadow-xl py-5 bg-[#514f4f] hover:bg-black text-white dark:bg-[#9d98a2]/30 dark:hover:bg-[#9d98a2]/20"
          // onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {/* jobs */}
      {loadingJobs && (
        <BarLoader className="m-auto mt-4" width={"50%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="w-[90%] md:w-[80%] m-auto mt-[50px] md:mt-[40px] grid grid-cols-1 md:grid-cols-2  gap-6 md:gap-20">
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
            <div className=" absolute top-8 left-[40%]">
              <h1 className="font-extrabold text-4xl text-gray-500 dark:text-gray-300 ">
                No Jobs Found
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
