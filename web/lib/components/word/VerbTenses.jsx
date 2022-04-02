import { useTranslation } from '@/lib/i18n'
import { Fragment } from 'react'

export function VerbTenses({ tenses }) {
  const { _e } = useTranslation()
  if (!tenses) return null

  // This should be translated and follow a specific order
  // V-inf, V-ing...

  return (
    <div className="tense-grid grid gap-x-2 gap-y-1 rounded bg-orange-100 p-2">
      <style jsx>
        {`
          .tense-grid {
            grid-template-columns: repeat(2, minmax(max-content, 1fr));
          }
          @media (min-width: 1280px) {
            .tense-grid {
              grid-template-columns: repeat(4, minmax(max-content, 1fr));
            }
          }
        `}
      </style>
      {Object.entries(tenses).flatMap(([k, v]) => (
        <Fragment key={k}>
          <strong className="font-semibold">{_e(`verbTense.${k}`)}:</strong>
          <span>{v}</span>
        </Fragment>
      ))}
    </div>
  )
}
