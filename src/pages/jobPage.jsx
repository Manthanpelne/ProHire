import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import { ApplicationCard } from "@/components/applicationCard";
import ApplyJobDrawer from "@/components/applyJob";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import MDEditor from "@uiw/react-md-editor";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

export const JobPage = () => {
  const { user, isLoaded } = useUser();
  const { id } = useParams();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, { job_id: id });



  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateHiringStatus, { job_id: id });


  const handleStatusChange = (value) =>{
    const isOpen = value === "open"
    fnHiringStatus(isOpen).then(()=>fnJob())
  }


  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  //console.log(job)

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="w-[90%] md:w-[80%] m-auto flex flex-col gap-5 md:gap-4">

      <div className="flex justify-between mt-[40px] gap-5 items-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold">{job?.title} </h1>
        <img className="w-20 pt-2 md:pt-0 sm:w-[200px]" src={job?.company?.logo_url} alt="" />
      </div>

      <div className="flex gap-20">
          <div className="flex gap-2">
            <MapPinIcon />
            {job?.location}
          </div>
          
            <div className="flex gap-2 items-center">
            <Briefcase /> {job?.applications?.length} Applicant
            </div>
            <div className="flex gap-2 items-center">
              {job?.isOpen? <><DoorOpen/></> : <><DoorClosed/>Closed</>  
            }
          </div>
        </div>
        

        {/* hiring status */}
        {job?.recruiter_id === user?.id && 
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}>
            <SelectValue placeholder={"Hiring Status" + (job?.isOpen ? "(Open)":"(closed)")} />
          </SelectTrigger>
          <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        }


      <div className="flex flex-col gap-2 justify-between md:mt-[20px] ">
        <h2 className="font-bold text-lg md:text-[21px]">About The Job</h2>
        <p className="font-semibold text-gray-700 dark:text-[#d6d4d4]">{job?.description}</p>

        <h3 className="font-bold md:text-lg mt-5">Requirements:</h3>
        <MDEditor.Markdown id="mark" source={job?.requirements} style={{ fontWeight:"600", whiteSpace: 'pre-wrap', background : "#181818", padding:"20px",borderRadius:"20px"}} />
      </div>


      {/* applying to a job */}
      {job?.recruiter_id !== user?.id &&
        <ApplyJobDrawer 
        job = {job}
        user = {user}
        fetchJob = {fnJob}
        applied = {job?.applocations?.find((ap)=>ap.candidate_id===user_id)}
        />
    }



    {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl md:text-3xl font-bold mt-10">Recieved Applications</h2>
        {job?.applications.map((app)=>{
          return <ApplicationCard key={app.id} app={app}/>
        })}
      </div>
    )}

    </div>
  );
};
