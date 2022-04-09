export function Button({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={`rounded-lg px-6 py-2 ${className}`}
      {...props}>
      {children}
    </button>
  )
}
