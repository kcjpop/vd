export function Button({ children, className, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`rounded-lg px-6 py-2  disabled:!bg-slate-200 disabled:!opacity-60 ${className}`}
      {...props}>
      {children}
    </button>
  )
}
