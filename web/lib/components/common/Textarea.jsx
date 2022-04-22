export function Textarea({ className, ...props }) {
  return (
    <textarea
      {...props}
      className={`my-1 max-w-full rounded border border-slate-400 p-3 py-1 focus:border-slate-600 ${className}`}
    />
  )
}
