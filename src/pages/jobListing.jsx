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
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 9; // Changed back to 1 for demonstration

export const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: allJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter/search change
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  function handleSearch(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  }

  const clearFilters = () => {
    setCompany_id("");
    setSearchQuery("");
    setLocation("");
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = allJobs?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((allJobs?.length || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-2xl mx-auto mb-20">
      <h1 className="font-extrabold text-4xl md:text-6xl text-center mt-28 md:mt-30">
        Latest Jobs
      </h1>

      {/* all filters here */}
      <form
        onSubmit={handleSearch}
        className="flex w-[90%] md:w-[80%] m-auto items-center gap-3 mt-10"
      >
        <Input
          type="text"
          placeholder="search Jobs by Title..."
          name="search-query"
          className="h-full py-3 dark:border-[#5a5959] bg-[#9d98a2]/10 dark:bg-[black]/30 flex-1 px-4 text-md"
        />
        <Button
          type="submit"
          className="h-full shadow-xl py-3 md:px-20 md:w-28 btnStyle text-white cursor-pointer"
        >
          Search
        </Button>
      </form>

      <div className="w-[90%] md:w-[80%] m-auto mt-5 flex flex-col items-center sm:flex-row gap-4">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="border-[1px] py-5 bg-[#9d98a2]/10 dark:bg-[black]/30  dark:border-[#5a5959]">
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
          <SelectTrigger className="border-[1px] py-5 bg-[#9d98a2]/10  dark:bg-[black]/30  dark:border-[#5a5959]">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={clearFilters}
          className="w-full md:w-auto px-10.5 shadow-xl py-5 cursor-pointer btnStyle text-white"
          // onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {/* jobs */}
      {loadingJobs && (
        <BarLoader className="m-auto mt-4" width={"50%"} color="#8309da" />
      )}

      {loadingJobs === false && (
        <>
          <div className="w-[90%] md:w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 m-auto mt-[50px] md:mt-[40px]  ">
            {currentJobs?.length ? (
              currentJobs.map((job) => {
                return (
                  <JobCard
                    key={job.id}
                    job={job}
                    savedInit={job?.saved?.length > 0}
                  />
                );
              })
            ) : (
              <div className="text-center">
                <h1 className="font-extrabold text-4xl text-gray-500 dark:text-gray-300 ">
                  No Jobs Found
                </h1>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="w-[90%] md:w-[80%] m-auto mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                  <PaginationItem>
                        <PaginationLink
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          aria-label="Previous page"
                          className={`${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                          } inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2`}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </PaginationLink>
                      </PaginationItem>
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                              (page) => (
                                <PaginationItem key={page} active={page === currentPage}>
                                  <PaginationLink
                                    onClick={() => handlePageChange(page)}
                                    className={`inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
                                      page === currentPage ? "bg-[#8309DA] text-white" : "hover:bg-accent hover:text-accent-foreground"
                                    }`}
                                  >
                                    {page}
                                  </PaginationLink>
                                </PaginationItem>
                              )
                            )}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                      className={`inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 ${
                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};