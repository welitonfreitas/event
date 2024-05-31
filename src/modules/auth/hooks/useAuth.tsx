import { useEffect, useState } from "react"
import supabase from "../../../lib/supabase"

export const useAuth = () => {
    
    const [session, setSession] = useState(supabase.auth.getSession())
    const user = session?.user

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const logOut = () => {
        supabase.auth.signOut().then(() => {
            setSession(null)
        })
    }

    return { session, user, logOut }

}