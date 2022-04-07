import got from 'got'

import { Page } from '@/lib/components/word'
import { fetchBannerEndpoint, fetchSingleWordEndpoint } from '@/lib/api'

export default Page

export async function getServerSideProps(ctx) {
  const { word } = ctx.query
  const opengraph = {
    title: `“${word}” tiếng Việt là gì?`,
    image: fetchBannerEndpoint(ctx.query),
  }

  try {
    const entry = await got(fetchSingleWordEndpoint(ctx.query)).json()

    return { props: { opengraph, entry } }
  } catch (e) {
    return { props: { opengraph } }
  }
}
