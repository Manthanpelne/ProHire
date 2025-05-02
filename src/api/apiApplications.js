import supaBaseClient, { supabaseUrl } from "@/lib/supabase";

export const applyToJob = async (token, _, jobData) => {
  const supabase = await supaBaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error uploading resume:", storageError);
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


//update applicatipn status
export const updateApplicationStatus = async (token, { job_id }, status) => {
  const supabase = await supaBaseClient(token);

  const { data, error } = await supabase
     .from("applications")
    .update({status})
    .eq("job_id", job_id)
    .select()

  if (error || data.length === 0) {
    console.error("Error updating application status:", error);
    return null;
  }
  return data;
};



//get applications
export const getApplications = async (token, {user_id}) => {
  const supabase = await supaBaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching Applications:", error);
    return null;
  }

  return data;
}