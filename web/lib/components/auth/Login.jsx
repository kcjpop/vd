import { useState } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from '../../i18n'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { login } from '../../domain-logic/auth'

export function Login() {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const { _e } = useTranslation()
  const router = useRouter()

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const doLogin = async () => {
    try {
      // @TODO: user, session returned from login function
      const { error } = await login({ email, password })

      if (error) throw error
    } catch (error) {
      console.error({ error })
    } finally {
      console.log('success')
    }
  }

  const redirectRegistration = () => router.push('/auth/register')

  return (
    <section className="container h-full">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative flex h-5/6 w-4/12 flex-col overflow-hidden rounded-lg border border-slate-400 sm:w-11/12 md:w-8/12">
          <div className="w-full py-14 px-20">
            <div className="mb-10 w-full">
              <p className="text-center">{_e('login.welcomeTo')}</p>
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
                    placeholder={_e('login.email')}
                    className="w-full"
                    onChange={handleChange(setEmail)}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    name="password"
                    placeholder={_e('login.password')}
                    className="w-full"
                    onChange={handleChange(setPassword)}
                  />
                </div>
                <div className="mt-6">
                  <Button
                    className="w-full bg-gray-700 text-white hover:bg-gray-900"
                    onClick={doLogin}>
                    {_e('login.login')}
                  </Button>
                </div>
                <div className="flex justify-center">
                  <Button className="text-sm text-slate-400 hover:text-slate-600">
                    {_e('login.forgotYourPassword')}
                  </Button>
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-4 flex w-full justify-center text-sm">
              <span>{_e('login.doNotHaveAnAccount')}</span>
              <Button
                onClick={redirectRegistration}
                className="!p-0 text-sm text-slate-400 hover:text-slate-600">
                &nbsp;
                {_e('login.registerHere')}
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
