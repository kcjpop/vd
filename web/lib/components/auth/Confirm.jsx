import { useEffect, useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from '../../i18n'
import { Layout } from '../common/Layout'

export function Page() {
  const { _e } = useTranslation()
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  useEffect(() => {
    /* eslint-disable */
    let timeout, interval

    timeout = setTimeout(() => {
      router.push('/auth')
    }, 1000 * 10)
    interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [router])

  return (
    <Layout>
      <section className="container h-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-auto w-1/3 rounded border border-slate-300 py-14 px-20 sm:w-10/12 md:w-5/6">
            <p className="my-4 text-center text-4xl font-bold">
              {_e('auth.emailConfirmed')}
            </p>
            <hr />
            <p className="mt-10 mb-1 text-center text-sm text-slate-400">
              {_e('auth.redirectToLoginPage')}
            </p>
            {countdown <= 0 ? (
              <Fragment>
                <p className="text-center text-sm text-slate-400">
                  {_e('auth.clickHereToRedirect')}
                </p>
                <div className="mt-5 flex w-full items-center justify-center">
                  <Link href={'/auth'}>{_e('auth.login')}</Link>
                </div>
              </Fragment>
            ) : (
              <p className="mt-2 text-center">
                <span>{_e('auth.redirectIn')}</span>
                &nbsp;
                <span>{countdown}</span>
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}
