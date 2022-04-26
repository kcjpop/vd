import { Layout } from '../common/Layout'
import { LinkToWord } from '../common/LinkToWord'

export function PageDict({ words }) {
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {words.map(({ word }) => (
          <LinkToWord
            key={word}
            query={{ word }}
            className="rounded bg-slate-100 p-2">
            {word}
          </LinkToWord>
        ))}
      </div>
    </Layout>
  )
}
