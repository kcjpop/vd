import { useState } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from '../../i18n'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Spinner } from '../common/Spinner'
import { login } from '../../domain-logic/auth'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  const { _e } = useTranslation()
  const router = useRouter()

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const doLogin = async () => {
    try {
      setLoading(true)
      setFormError(null)
      // @TODO: user, session returned from login function
      const { user, session, error } = await login({ email, password })

      if (error) throw error

      console.log({ user, session })
    } catch (error) {
      console.error({ error })
      setFormError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const redirectRegistration = () => router.push('/auth/register')

  return (
    <section className="container h-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative flex h-5/6 w-4/12 flex-col overflow-hidden rounded-lg border border-slate-400 sm:w-11/12 md:w-8/12">
          <div className="w-full py-14 px-20">
            <div className="mb-10 w-full">
              <p className="text-center">{_e('auth.welcomeTo')}</p>
              <p className="slate-700 text-center text-6xl font-bold">
                tudien.io
              </p>
            </div>
            <div className="mb-4 w-full">
              <div className="w-full">
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
                  />
                </div>
                {formError && (
                  <div>
                    <p className="text-center text-sm text-red-500">
                      {formError}
                    </p>
                  </div>
                )}
                <div className="mt-6">
                  <Button
                    className="w-full bg-gray-700 text-white hover:bg-gray-900"
                    onClick={doLogin}
                    disabled={loading}>
                    {loading ? <Spinner /> : _e('auth.login')}
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="text-sm text-slate-400 hover:text-slate-600"
                    disabled={loading}>
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
                className="!p-0 text-sm text-slate-400 hover:text-slate-600"
                disabled={loading}>
                &nbsp;
                {_e('auth.registerHere')}
              </Button>
            </div>
          </div>
          <div className="w-full border-none bg-gradient-to-br from-gray-300 via-slate-400 to-slate-600 p-5">
            <p className="mb-4 text-2xl">tudien.io</p>
            <p className="text-sm">
              Nullam finibus neque eu neque tincidunt, eget eleifend arcu
              iaculis. Nulla malesuada efficitur suscipit. Donec et tincidunt
              turpis. Aenean auctor augue ut nunc tristique bibendum. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec
              tincidunt leo. Morbi fringilla ornare libero ut rhoncus. Praesent
              dapibus orci vel ex aliquet varius.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
