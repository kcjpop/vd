import { Page } from '@/lib/components/word'

export default Page

export async function getServerSideProps(ctx) {
  const { word } = ctx.query

  const opengraph = {
    title: `“${word}” tiếng Việt là gì?`,
    image: `https://${ctx.req.headers.host}/api/banner?w=${word}`,
  }

  return { props: { opengraph } }
}
