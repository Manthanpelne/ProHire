import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { useFetch } from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";

const schema = z.object({
  experience: z
    .number()
    .min(2, { message: "Experience must be minimum 2 years" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      {
        message: "Only PDF or Word Document is allowed",
      }
    ),
});

const ApplyJobDrawer = ({ applied = false, user, fetchJob, job }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  //console.log(job.isOpen,user)

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild  className="cursor-pointer border-2">
        <Button
          disabled = {job?.applications?.length>0}
          className="shadow-xl py-6 px-20 text-lg bg-[#514f4f] hover:bg-black text-white dark:bg-[#9d98a2]/30 dark:hover:bg-[#9d98a2]/20 cursor-pointer m-auto mt-5"
        >
          {job?.isOpen
            ? ((job?.applications?.length>0)
              ? "Applied"
              : "Apply Now")
            : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[90%] md:w-[80%] m-auto">
        <DrawerHeader>
          <DrawerTitle className="">
            Applying For The Role {job?.title} At {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription>Fill The Application Below :</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid items-start gap-6 px-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="experience">Years Of Experience</Label>
            <Input
              type="number"
              placeholder="Mention Experience"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />
            {errors?.experience && (
              <p className="text-orange-500">{errors?.experience?.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              type="text"
              placeholder="Enter Skills (Comma Seperated)"
              {...register("skills")}
            />
            {errors?.skills && (
              <p className="text-orange-500">{errors?.skills?.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="education">Education</Label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  {...field}
                  className="text-[gray]"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Graduate" id="graduate" />
                    <Label htmlFor="expert">Graduate</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Post Graduate" id="post-graduate" />
                    <Label htmlFor="post-graduate">Post Graduate</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors?.education && (
              <p className="text-orange-500">{errors?.education?.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="resume">Upload Resume</Label>
            <Input
              type="file"
              accept=".pdf, .doc, .docx"
              className="flex-1 file:text-gray-400"
              {...register("resume")}
            />
            {errors?.resume && (
              <p className="text-orange-500">{errors?.resume?.message}</p>
            )}
          </div>

          {errorApply?.message && (
            <p className="text-orange-500">{errorApply?.message}</p>
          )}

          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}
          <Button className="cursor-pointer">Apply</Button>
        </form>

        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="w-full mt-2 cursor-pointer">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyJobDrawer;
