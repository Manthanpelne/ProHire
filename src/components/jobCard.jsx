import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { Button } from "./ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export const JobCard = ({ job, isMyJob = false, savedInit = false, onJobSaved = () => {} }) => {

  const [saved, setSaved] = useState(savedInit)

  const {
    fn: fnSavedJob,
    data: savedJob, // Renamed to avoid confusion
    loading: loadingSavedJob,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const { user } = useUser();


  const handleSaveJobs = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  //console.log(job)

useEffect(() => {
  if(savedJob !== undefined) setSaved(savedJob?.length > 0)
}, [savedJob])


// handling delete job
const {loading: loadingDeleteJob, fn: fnDeleteJob} = useFetch(deleteJob, {
  job_id : job?.id})


  const handleDeleteJob = async () =>{
   await fnDeleteJob()
   onJobSaved()
  }

  //console.log("saved:", saved);


  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
<Card className=" w-full h-full relative m-auto rounded-3xl shadow-lg dark:bg-[black]/60 flex flex-col">
{loadingDeleteJob && (
  <BarLoader className="m-auto mt-4" width={"100%"} color="#8309DA"/>
)}
  <CardHeader>
    <CardTitle className="flex gap-2 items-center text-[18px]">
      {job.title}
      {isMyJob && (
        <Trash2Icon
          fill="red"
          size={18}
          className="text-red-300 cursor-pointer"
          onClick={handleDeleteJob}
        />
      )}
    </CardTitle>
  </CardHeader>

  <CardContent className="flex-grow"> {/* This will take up most of the vertical space */}
    <div className="flex justify-between items-center ">
      {job.company && <img src={job.company.logo_url} className="h-6" />}
      <div className="flex items-center gap-2 mt-2">
        <MapPinIcon size={15} /> {job.location}
      </div>
    </div>
    <hr className="my-3" />
    {job.description.substring(0, job.description.length / 2)}...
    {job.description.length > job.description.length / 2 && (
      <Link to={`/job/${job.id}`} className="text-blue-500 cursor-pointer">
        Read More
      </Link>
    )}
  </CardContent>

  <CardFooter className="flex gap-6 items-center mt-5"> {/* Add margin-top for the gap */}
    <Link to={`/job/${job.id}`} className="w-full">
      <button className="w-full btnStyle  cursor-pointer text-white py-2 rounded-md">
        View Job
      </button>
    </Link>

    {!isMyJob && (
      <Button variant="outline" className="w-15 cursor-pointer shadow-lg" onClick={handleSaveJobs} disabled={loadingSavedJob}>
        {saved ? (
          <Heart className="" size={24} stroke="#8309DA" fill="#8309DA" />
        ) : (
          <Heart className="" size={24} />
        )}
      </Button>
    )}
  </CardFooter>
</Card>
  );
};