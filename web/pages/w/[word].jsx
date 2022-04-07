import got from 'got'

import { Page } from '@/lib/components/word'
import { fetchBannerEndpoint, fetchSingleWordEndpoint } from '@/lib/api'

export default Page

export async function getServerSideProps(ctx) {
  const { word } = ctx.query
  const entry = await got(fetchSingleWordEndpoint(ctx.query)).json()

  const opengraph = {
    title: `“${word}” tiếng Việt là gì?`,
    image: fetchBannerEndpoint(ctx.query),
  }

  return { props: { opengraph, entry: entry ?? null } }
}
