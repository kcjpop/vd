import { fetchAllWordsOfDict } from '@/lib/api'

export { PageDict as default } from '@/lib/components/dict/PageDict'

export const getServerSideProps = async (ctx) => {
  const result = await fetchAllWordsOfDict({
    offset: ctx.query.offset ?? 0,
    limit: ctx.query.limit ?? 100,
  })

  return {
    props: {
      opengraph: {
        title: 'Từ điển Anh - Việt',
      },
      ...result,
    },
  }
}
