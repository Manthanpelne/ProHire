import supaBaseClient, { supabaseUrl } from "@/lib/supabase";

export const applyToJob = async (token, _, jobData) => {
  const supabase = await supaBaseClient(token);

  const random = Math.floor(Math.random * 90000);
  const fileName = `resume - ${random} - ${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error uploading resume:", error);
    return null;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([{ ...jobData, resume }])
    .select();
  
  if (error) {
    console.error("Error submitting application:", error);
    return null;
  }
  return data;
};
