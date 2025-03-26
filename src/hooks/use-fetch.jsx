//custom hook for fetching data 
import { useState } from "react"
import { useSession } from "@clerk/clerk-react"

export const useFetch = (cb, options = {}) => {
   const [data, setData] = useState(undefined)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(null)

   const {session} = useSession()

    const fetchData = async (...args) => {
        setLoading(true)
        try {
            const supabaseAccessToken = await session?.getToken({
                template : "supabase"
            })
            const data = await cb(supabaseAccessToken, options, ...args)
            setData(data)
            setError(null)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return {fetchData, data, error, loading}
}