export function Textarea({ className, ...props }) {
  return (
    <textarea
      {...props}
      className={`min-h-full max-w-full rounded border border-slate-400 p-2 focus:border-slate-600 ${className}`}
    />
  )
}
