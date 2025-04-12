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
import { saveJob } from "@/api/apiJobs";
import { Button } from "./ui/button";
import { useFetch } from "@/hooks/use-fetch";

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
    const response = await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    // Update the saved state based on the response of the save/unsave action
    if (response) {
      setSaved(response.isSaved); // Adjust based on your API response
    }
    onJobSaved();
  };


useEffect(() => {
  if(savedJob !== undefined) setSaved(savedJob?.length > 0)
}, [savedJob])


  //console.log("saved:", saved);


  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <Card className=" xl:max-w-6xl m-auto rounded-3xl shadow-xl dark:bg-[#0C121B]">
      <CardHeader>
        <CardTitle className="flex gap-2 items-center text-[18px]">
          {job.title}
          {!isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="">
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
      <CardFooter className="flex gap-6 items-center">
        <Link to={`/job/${job.id}`} className="w-full">
          <button className="w-full bg-blue-500 cursor-pointer text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            View Job
          </button>
        </Link>

        {!isMyJob && (
          <Button variant="outline" className="w-15 cursor-pointer shadow-lg" onClick={handleSaveJobs} disabled={loadingSavedJob}>
            {saved ? (
              <Heart className="" size={24} stroke="red" fill="#eebbbb" />
            ) : (
              <Heart className="" size={24} />
            )}
          </Button>
        )}

      </CardFooter>
    </Card>
  );
};