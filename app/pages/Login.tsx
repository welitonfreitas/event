import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import supabase from '../lib/supabase'
import { useAuth } from '../modules/auth/hooks/useAuth'
import { Button } from '@mui/material'


export default function Login() {
    const { session, user, logOut } = useAuth()
    
    // useEffect(() => {
    //     supabase.auth.getSession().then(({ data: { session } }) => {
    //         setSession(session)
    //     })

    //     const {
    //         data: { subscription },
    //     } = supabase.auth.onAuthStateChange((_event, session) => {
    //         setSession(session)
    //     })

    //     return () => subscription.unsubscribe()
    // }, [])

    if (!session) {
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']}  />)
    }
    else {
        return (<>
        <div>Logged in! </div>
        <div>{user?.email}</div>
            <Button onClick={logOut}>Sign Out</Button>
        </>
    )
    }
}