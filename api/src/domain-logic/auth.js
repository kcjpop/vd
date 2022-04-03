import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './supabaseClient'

export function register({ email, password, fullname }) {
  return supabase.auth.signUp({ email, password }, { data: { fullname } })
}

export function login({ email, password }) {
  return supabase.auth.signIn({ email, password })
}

export function isAuthenticated() {
  const session = supabase.auth.session()

  return session?.user
}

export function useUser() {
  const [user, setUser] = useState(null)
  const [isChecking, setIsChecking] = useState(true)
  const [token, setToken] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const handler = (session) => {
      if (session?.user.id) {
        setUser(session.user)
        setToken(session.access_token)
      }

      setIsChecking(false)
    }

    supabase.auth.onAuthStateChange((event, session) => handler(session))
    handler(supabase.auth.session())
  }, [])

  useEffect(() => {
    if (!isChecking && !user) router.push('/auth/login')
  }, [isChecking, user, router])

  return { user, token }
}
