import { getMyJobs } from '@/api/apiJobs';
import { useFetch } from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { JobCard } from './jobCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 9; // Changed back to 1 for demonstration

export const CreatedJobs = () => {
  const { user } = useUser();

  const [currentPage, setCurrentPage] = useState(1);

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user?.id,
  });

  useEffect(() => {
    setCurrentPage(1);
    fnCreatedJobs();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = createdJobs?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((createdJobs?.length || 0) / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#8309da" />
      ) : (
        <div className="md:mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-">
          {currentJobs?.length ? (
            currentJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobSaved={fnCreatedJobs}
                  isMyJob
                  //fnCreateJobs - again fetches all the jobs after deleting a job
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
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
  );
};