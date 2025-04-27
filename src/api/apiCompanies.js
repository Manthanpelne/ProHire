import supaBaseClient, { supabaseUrl } from "@/lib/supabase"

export const getCompanies=async(token)=>{
    const supabase = await supaBaseClient(token)

        // If the job is already saved, remove it
        const { data, error} = await supabase.from("companies").select("*")
        //console.log("companies:",data)
        if (error) {
          console.error("Error fetching companies:", error);
          return null;
        }
        return data;
}


export const addNewCompany = async(token, _, companyData)=>{
  const supabase = await supaBaseClient(token);

  const random = Math.floor(Math.random * 90000);
  const fileName = `logo - ${random} - ${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) {
    console.error("Error uploading company-logo:", storageError);
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  const { data, error } = await supabase
    .from("companies")      
    .insert([{ 
      name: companyData.name,
      logo_url:logo_url,
     }])
    .select();
  
  if (error) {
    console.error("Error posting company:", error);
    return null;
  }
  return data;
};