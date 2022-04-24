import { Spinner } from './Spinner'

export function Button({
  children,
  className,
  type = 'button',
  loading = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`rounded px-4 py-2 disabled:!bg-slate-200 disabled:!opacity-60 ${className}`}
      {...props}>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  )
}
