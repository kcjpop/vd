import { useState } from 'react'
import Link from 'next/link'

import { useTranslation } from '@/lib/i18n'
import { register } from '@/lib/auth'

import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Alert } from '../common/Alert'

function RegisterForm({ onSubmit, loading }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [fullname, setFullname] = useState('')

  const { _e } = useTranslation()

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const doSubmit = (e) => {
    e.preventDefault()
    typeof onSubmit === 'function' && onSubmit(e, { email, password, fullname })
  }

  return (
    <form
      onSubmit={doSubmit}
      className="flex flex-col gap-4"
      disabled={loading}>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold tracking-wide">
          {_e('auth.fullname')}*
        </span>

        <Input
          required
          type="text"
          name="fullname"
          placeholder="e.g. John Doe"
          value={fullname}
          onChange={handleChange(setFullname)}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold tracking-wide">
          {_e('auth.email')}*
        </span>

        <Input
          required
          type="email"
          name="email"
          placeholder="e.g. john@tudien.io"
          value={email}
          onChange={handleChange(setEmail)}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold tracking-wide">
          {_e('auth.password')}*
        </span>

        <Input
          required
          type="password"
          name="password"
          placeholder={_e('auth.passwordPlaceholder')}
          value={password}
          onChange={handleChange(setPassword)}
          minLength="8"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold tracking-wide">
          {_e('auth.reenterPassword')}*
        </span>

        <Input
          required
          type="password"
          name="confirm-password"
          placeholder={_e('auth.passwordConfirmationPlaceholder')}
          value={password2}
          onChange={handleChange(setPassword2)}
          minLength="8"
        />
      </label>

      <Button type="submit" loading={loading}>
        {_e('auth.register')}
      </Button>
    </form>
  )
}

export function Register() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const { _e } = useTranslation()

  const doRegister = async function (e, input) {
    setError(null)
    setLoading(true)
    try {
      const { user, error } = await register(input)
      if (error) throw error
      setUser(user)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex flex-col gap-4 rounded bg-slate-100 p-8 md:max-w-lg">
      <h1 className="text-xl font-bold">{_e('auth.registerTitle')}</h1>

      {error && (
        <Alert variant="danger">
          <p>{_e('auth.errors.register')}</p>
        </Alert>
      )}

      {user && (
        <Alert variant="success">
          <p>{_e('auth.registerSuccessfully')}</p>
        </Alert>
      )}

      <RegisterForm onSubmit={doRegister} loading={loading} />

      <div className="text-center text-sm">
        <span>{_e('auth.alreadyHaveAnAccount')}</span>{' '}
        <Link href="/auth">
          <a className="text-sky-600">{_e('auth.loginHere')}</a>
        </Link>
      </div>
    </section>
  )
}
