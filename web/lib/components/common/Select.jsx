export function Select({ children, className, ...props }) {
  return (
    <select
      className={`max-w-full rounded border border-slate-400 focus:border-slate-600 ${className}`}
      {...props}>
      {children}
    </select>
  )
}
