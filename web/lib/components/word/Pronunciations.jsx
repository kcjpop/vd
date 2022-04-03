export function Pronunciations({ entries }) {
  if (!entries) return null

  return (
    <div className="flex flex-wrap gap-2 text-slate-700">
      {entries.map((p) => (
        <p key={p} className="tracking-wider">
          /{p}/
        </p>
      ))}
    </div>
  )
}
