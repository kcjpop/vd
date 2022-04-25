import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useTranslation } from '../../i18n'
import { login } from '../../auth'

import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Alert } from '../common/Alert'

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

      router.push(router.query.redirectTo || '/')
    } catch (error) {
      setFormError(error.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={doLogin} className="flex flex-col gap-4">
      {formError && (
        <Alert variant="danger">
          <p>{formError}</p>
        </Alert>
      )}

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold tracking-wide">
          {_e('auth.email')}*
        </span>

        <Input
          required
          type="email"
          name="email"
          placeholder="joe@tudien.io"
          value={email}
          onChange={handleChange(setEmail)}
          disabled={loading}
        />
      </label>

      <label className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wide">
            {_e('auth.password')}*
          </span>

          <Link href="#">
            <a className="text-sm text-sky-600">
              {_e('auth.forgotYourPassword')}
            </a>
          </Link>
        </div>

        <Input
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange(setPassword)}
          disabled={loading}
          placeholder="••••••••"
        />
      </label>

      <Button
        variant="primary"
        type="submit"
        loading={loading}
        disabled={loading}>
        {_e('auth.login')}
      </Button>
    </form>
  )
}

export function Login() {
  const { _e } = useTranslation()

  return (
    <section className="mx-auto flex flex-col gap-4 rounded bg-slate-100 p-8 md:max-w-lg">
      <h1 className="text-xl font-bold">{_e('auth.loginTitle')}</h1>

      <LoginForm />

      <div className="text-center text-sm">
        <span>{_e('auth.doNotHaveAnAccount')}</span>{' '}
        <Link href="/auth/register">
          <a className="text-sky-600">{_e('auth.registerHere')}</a>
        </Link>
      </div>
    </section>
  )
}
