import { Spinner } from './Spinner'

const variants = {
  primary: 'bg-gray-700 text-white hover:bg-gray-900',
  secondary:
    'border border-orange-200 bg-orange-100 text-orange-700 hover:border-orange-300',
}

/**
 * @param {object} props
 * @param {"primary" | "secondary"} props.variant
 */
export function Button({
  children,
  type = 'button',
  loading = false,
  variant = 'primary',
  ...props
}) {
  return (
    <button
      type={type}
      className={`${variants[variant]} rounded px-4 py-2 text-sm font-semibold tracking-wide`}
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
