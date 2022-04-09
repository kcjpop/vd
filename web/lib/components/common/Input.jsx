export function Input({ className, ...props }) {
  return (
    <input
      className={`my-1 max-w-full rounded border border-slate-400 p-3 py-1 focus:border-slate-600 ${className}`}
      {...props}
    />
  )
}
