import { Page } from '@/lib/components/word'

export default Page

export async function getServerSideProps(ctx) {
  const { word } = ctx.query

  const opengraph = {
    title: `“${word}” tiếng Việt là gì?`,
  }

  return { props: { opengraph } }
}
