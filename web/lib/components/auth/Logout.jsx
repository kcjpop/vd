import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../common/Layout'
import { useTranslation } from '../../i18n'
import { logout } from '../../domain-logic/auth'

export function Page() {
  const { _e } = useTranslation()
  const router = useRouter()

  const signout = useCallback(async () => {
    const { error } = await logout()

    if (error) throw error

    router.push('/')
  }, [router])

  useEffect(() => {
    signout()
  }, [signout])

  return (
    <Layout>
      <div className="items- flex h-full w-full justify-center">
        <p className="text- text-center font-bold">{_e('auth.logout')} ...</p>
      </div>
    </Layout>
  )
}
