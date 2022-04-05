import { useState } from 'react'

import { useTranslation } from '../../i18n'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Spinner } from '../common/Spinner'
import { register } from '../../domain-logic/auth'

export function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [fullname, setFullname] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formError, setFormError] = useState(null)

  const { _e } = useTranslation()

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const doRegister = async function (event) {
    event.preventDefault()
    try {
      setLoading(true)
      setFormError(null)
      // @todo: user, session returned from register function
      const { user, error } = await register({
        email,
        password,
        fullname,
      })
      if (error) throw error

      if (user) {
        setSuccess(true)
      }
    } catch (error) {
      setFormError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <section className="container h-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="w-1/2 rounded border border-slate-300 px-20 py-10 sm:w-10/12 md:w-5/6">
            <p className="mb-8 text-center text-3xl text-green-500">
              {_e('auth.registerSuccessfully')}
            </p>
            <p className="text-md my-1 text-center text-slate-600">
              {_e('auth.pleaseConfirmYourEmail')}
            </p>
          </div>
        </div>
      </section>
    )
  }

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
                <form onSubmit={doRegister}>
                  <div>
                    <Input
                      type="text"
                      name="fullname"
                      placeholder={_e('auth.fullname')}
                      className="w-full"
                      value={fullname}
                      onChange={handleChange(setFullname)}
                    />
                  </div>
                  <div className="">
                    <Input
                      type="text"
                      name="email"
                      placeholder={_e('auth.email')}
                      className="w-full"
                      value={email}
                      onChange={handleChange(setEmail)}
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
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      name="confirm-password"
                      placeholder={_e('auth.reenterPassword')}
                      className="w-full"
                      value={password2}
                      onChange={handleChange(setPassword2)}></Input>
                  </div>
                  {formError && (
                    <p className="text-red text-md my-2">{formError}</p>
                  )}
                  <div className="mt-6">
                    <Button
                      className="w-full bg-gray-700 text-white hover:bg-gray-900"
                      type="submit"
                      disabled={loading}>
                      {loading ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <Spinner />
                        </div>
                      ) : (
                        _e('auth.register')
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
