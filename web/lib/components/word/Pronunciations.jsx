export function Pronunciations({ entries }) {
  if (!entries) return null

  return (
    <div className="text-slate-700">
      {entries.map((p) => (
        <p key={p} className="tracking-wider">
          /{p}/
        </p>
      ))}
    </div>
  )
}
