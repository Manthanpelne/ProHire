import supaBaseClient from "@/lib/supabase"


export async function getJobs(token) {
    const supabase = await supaBaseClient(token)
    
    let  query = supabase.from("jobs").select("*")

    const {data, error} = await query
    
    if(error){
        console.error("Error fetching Jobs:", error)
        return null
    }
    
    return data
}