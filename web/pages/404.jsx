import { Layout } from '@/lib/components/common/Layout'
import { useTranslation } from '@/lib/i18n'

export default function PageNotFound() {
  const { _e } = useTranslation()

  return (
    <Layout>
      <h1 className="text-4xl font-bold">404</h1>
      <p>{_e('error.pageNotFound')}</p>
    </Layout>
  )
}
