import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './supabaseClient'

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

export function logout() {
  return supabase.auth.signOut()
}

export function useAuthenticated() {
  const [authenticated, setAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const handler = (session) => {
      if (session?.user.id) {
        setAuthenticated(true)
      }

      setIsChecking(false)
    }

    supabase.auth.onAuthStateChange((event, session) => handler(session))
    handler(supabase.auth.session())
  }, [])

  return { authenticated, isChecking }
}

export function User(userObject) {
  Object.entries(userObject).forEach(([key, value]) => (this[key] = value))

  this.getFullname = function () {
    return this.user_metadata.fullname
  }

  this.getRole = function () {
    return this.role
  }

  this.getEmail = function () {
    return this.email
  }

  return this
}

export function useUser() {
  const [user, setUser] = useState(null)
  const [isChecking, setIsChecking] = useState(true)
  const [token, setToken] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const handler = (session) => {
      if (session?.user.id) {
        setUser(new User(session.user))
        setToken(session.access_token)
      }

      setIsChecking(false)
    }

    supabase.auth.onAuthStateChange((event, session) => handler(session))
    handler(supabase.auth.session())
  }, [])

  useEffect(() => {
    if (!isChecking && !user) router.push('/auth')
  }, [isChecking, user, router])

  return { user, token }
}
