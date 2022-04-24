export function Label({ children, label }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-semibold tracking-wide">{label}</span>
      {children}
    </label>
  )
}
