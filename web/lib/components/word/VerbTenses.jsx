export function VerbTenses({ tenses }) {
  if (!tenses) return null

  // This should be translated and follow a specific order
  // V-inf, V-ing...

  return (
    <div className="tense-grid grid gap-x-2 gap-y-1 rounded bg-blue-50 p-2">
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
      {Object.entries(tenses).flatMap(([k, v]) => [
        <strong className="font-semibold" key={k}>
          {k}:
        </strong>,
        <span key={v}>{v}</span>,
      ])}
    </div>
  )
}
