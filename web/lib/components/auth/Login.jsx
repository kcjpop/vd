import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from '../../i18n'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Spinner } from '../common/Spinner'
import { login, useUser } from '../../domain-logic/auth'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  const { _e } = useTranslation()
  const router = useRouter()

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const doLogin = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      setFormError(null)
      // @TODO: user, session returned from login function
      const { error } = await login({ email, password })

      if (error) throw error

      router.push('/')
    } catch (error) {
      setFormError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={doLogin}>
      <div className="">
        <Input
          type="text"
          name="email"
          placeholder={_e('auth.email')}
          className="w-full"
          value={email}
          onChange={handleChange(setEmail)}
          disabled={loading}
        />
      </div>
      <div>
        <Input
          type="password"
          name="password"
          placeholder={_e('auth.password')}
          className="w-full"
          value={password}
          onChange={handleChange(setPassword)}
          disabled={loading}
          autoComplete="off"
        />
      </div>
      {formError && (
        <div>
          <p className="text-center text-sm text-red-500">{formError}</p>
        </div>
      )}
      <div className="mt-6">
        <Button
          className="w-full bg-gray-700 text-white hover:bg-gray-900"
          type="submit"
          disabled={loading}>
          {loading ? <Spinner /> : _e('auth.login')}
        </Button>
      </div>
    </form>
  )
}

export function Login() {
  const redirectRegistration = () => router.push('/auth/register')
  const { user } = useUser({ redirectIfUnauthenticated: false })
  const { _e } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  return (
    <section className="container m-auto h-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative flex h-5/6 w-4/12 flex-col overflow-hidden rounded-lg border border-slate-400 sm:w-11/12 md:w-7/12">
          <div className="w-full py-14 px-20">
            <div className="mb-10 w-full">
              <p className="text-center">{_e('auth.welcomeTo')}</p>
              <p className="slate-700 text-center text-6xl font-bold">
                tudien.io
              </p>
            </div>
            <div className="mb-4 w-full">
              <div className="w-full">
                <LoginForm />
                <div className="flex justify-center">
                  <Button className="text-sm text-slate-400 hover:text-slate-600">
                    {_e('auth.forgotYourPassword')}
                  </Button>
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-4 flex w-full justify-center text-sm">
              <span>{_e('auth.doNotHaveAnAccount')}</span>
              <Button
                onClick={redirectRegistration}
                className="!p-0 text-sm text-slate-400 hover:text-slate-600">
                &nbsp;
                {_e('auth.registerHere')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
