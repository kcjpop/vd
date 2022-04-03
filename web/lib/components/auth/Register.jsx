import { useState } from 'react'

import { useTranslation } from '../../i18n'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { Spinner } from '../common/Spinner'
import { register } from '../../domain-logic/auth'

export function Register() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [password2, setPassword2] = useState(null)
  const [fullname, setFullname] = useState(null)
  const [loading, setLoading] = useState(false)

  const { _e } = useTranslation()

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const doRegister = async function () {
    try {
      setLoading(true)
      // @todo: user, session returned from register function
      const { error } = await register({
        email,
        password,
        fullname,
      })
      if (error) throw error
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
                <div className="mt-6">
                  <Button
                    className="w-full bg-gray-700 text-white hover:bg-gray-900"
                    onClick={doRegister}
                    disabled={loading}>
                    {loading ? <Spinner /> : _e('auth.register')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
