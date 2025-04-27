import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import { CompanyDrawer } from "@/components/companyDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Select,SelectContent, SelectGroup,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { data, Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

export const PostJob = () => {
  const { isLoaded, user } = useUser();

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  const {
    fn: fnCompanies,
    data: companies,
    loading: loadingCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

const {loading: loadingCreateJob, error: errorCreateJob, data:dataCreateJob, fn: fnCreateJob} = useFetch(addNewJob)


const onSubmit = (data) =>{
  fnCreateJob({
    ...data,
    recruiter_id : user?.id,
    isOpen : true
  })
}


useEffect(() => {
  if(dataCreateJob?.length > 0) navigate("/jobs")
}, [loadingCreateJob])


  if (!isLoaded || loadingCompanies) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="w-[90%] md:w-[80%] m-auto">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center mt-[30px] md:mt-[50px]">
        Post A Job
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex textbox flex-col gap-6 md:w-[70%] m-auto mt-[30px] md:mt-[50px] border-[1px] p-5 md:p-10 bg-white dark:bg-black/40 rounded-2xl">
        <div className="flex flex-col gap-2">
          <Label className="text-lg" htmlFor="title ">Job title</Label>
          <Input
            className="bg-[#F7F8F9] dark:bg-black"
            placeholder="Job Title"
            {...register("title")}
          />
          {errors?.title && (
            <p className="text-orange-600">{errors?.title?.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-lg" htmlFor="title">Description </Label>
          <Textarea
            className="bg-[#F7F8F9] dark:bg-black"
            placeholder="Job Description"
            {...register("description")}
          />
          {errors?.description && (
            <p className="text-orange-600">{errors?.description?.message}</p>
          )}
        </div>

   
        <div className="w-full">
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="border-[1px] py-5 bg-[#F7F8F9] dark:bg-black  dark:border-[#5a5959]">
                  <SelectValue placeholder="Select Location" />
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
            )}
          />
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 md:gap-10">
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full md:w-[50%] border-[1px] py-5 bg-[#F7F8F9] dark:bg-black  dark:border-[#5a5959]">
                  <SelectValue placeholder="Select Company">
                    {field.value
                      ? companies?.find((c) => c.id === Number(field.value))
                          ?.name
                      : "Select Company"}
                  </SelectValue>
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
            )}
          />
     
          <span className="dark:text-[#9d9c9c]">OR</span>
          {/* add company drawer */}
          <CompanyDrawer fetchCompanies={fnCompanies} />
        </div>


        {errors.location && (
          <p className="text-orange-600">{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className="text-orange-600">{errors.company_id.message}</p>
        )}


        <div className="flex flex-col gap-3"> 
          <Label className="text-lg">Enter Requirements</Label>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <MDEditor style={{backgroundColor: "black"}}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.requirements && (
            <p className="text-orange-600">{errors.requirements.message}</p>
          )}
          {errors.errorCreateJob && (
          <p className="text-orange-600">{errors?.errorCreateJob?.message}</p>
        )}
          {errorCreateJob?.message && (
          <p className="text-orange-500">{errorCreateJob?.message}</p>
        )}
          {loadingCreateJob && <BarLoader width={"100%"} color="#36d7b7" />}
          </div>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer mt-2 text-white"
            size="lg"
          >
            Submit
          </Button>
      </form>
    </div>
  );
};
