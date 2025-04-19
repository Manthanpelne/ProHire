import supaBaseClient from "@/lib/supabase"

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