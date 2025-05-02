import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Boxes, Briefcase, Download, School } from "lucide-react";
import { useFetch } from "@/hooks/use-fetch";
import { updateApplicationStatus } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    { job_id: application?.job_id }
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  console.log("application", application);

  return (
    <Card className="bg-[#181818] rounded-2xl text-white">
      {loadingHiringStatus && <BarLoader width={"100%"} color="#8309da" />}
      <CardHeader className="border-b-[1px] border-[#373333]">
        <CardTitle className="flex justify-between gap-5 items-center font-semibold text-xl">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <div className="flex items-center gap-2">
            <Download
              size={31}
              onClick={handleDownload}
              className="rounded-full borde-[1px] bg-[gray]/20 p-2 cursor-pointer"
            />
            <label className="text-sm font-normal">Download Resume</label>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-5">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Briefcase color="brown" size={18} /> {application?.experience} Years Of
              Experience{" "}
            </div>
            <div className="flex gap-2 items-center">
              <School color="brown" size={18} /> {application?.education}
            </div>
            <div className="flex gap-2 items-center">
              <Boxes color="brown" size={18} /> {application?.skills}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {isCandidate ? (
              <span className="flex items-center gap-2">Status: <p className="text-blue-500">{application?.status}</p> </span>
            ) : (
              // {else}
              <>
                <Select
                  onValueChange={handleStatusChange}
                  defaultValue={application?.status}
                >
                  <SelectTrigger className="md:w-52">
                    <SelectValue placeholder="Application Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
            <span className="text-[gray]">
              {new Date(application?.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
