import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import supabase from '../lib/supabase'
import { useAuth } from '../modules/auth/hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string';



export default function Login() {
    const { session } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()
    
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
        const { redirecTo } = queryString.parse(location.search);
        console.log(redirecTo)
        navigate(redirecTo == null ? '/' : redirecTo as string)
    }
}