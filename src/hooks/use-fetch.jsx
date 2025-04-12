//custom hook for fetching data 
import { useState } from "react"
import { useSession } from "@clerk/clerk-react"

export const useFetch = (cb, options = {}) => {
   const [data, setData] = useState(undefined)
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(null)

   const {session} = useSession()

    const fn = async (...args) => {
        setLoading(true)
        try {
            const supabaseAccessToken = await session?.getToken({
                template : "supabase"
            })
            const response = await cb(supabaseAccessToken, options, ...args)
            setData(response)
            setError(null)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return {fn, data , error, loading}
}

