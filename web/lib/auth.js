import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './supabaseClient'
import { clearStorage } from './storage'

export function register({ email, password, fullname }) {
  return supabase.auth.signUp(
    { email, password },
    {
      data: { fullname },
      redirectTo: `${window?.location.origin}/auth/confirm`,
    },
  )
}

export function login({ email, password }) {
  return supabase.auth.signIn({ email, password })
}

export async function logout() {
  await supabase.auth.signOut()

  clearStorage()
}

export function useUser({ redirectIfUnauthenticated = false } = {}) {
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
    if (!isChecking && !user && redirectIfUnauthenticated) router.push('/auth')
  }, [isChecking, user, router, redirectIfUnauthenticated])

  return { user, token, isChecking }
}
