import { forwardRef } from 'react'
import { Spinner } from './Spinner'

const variants = {
  default: 'bg-slate-200 text-slate-700 hover:bg-slate-300',
  primary: 'bg-gray-700 text-white hover:bg-gray-900',
  secondary:
    'border border-orange-200 bg-orange-100 text-orange-700 hover:border-orange-300',
}

function getClasses(variant) {
  return `${variants[variant]} rounded px-4 py-2 text-sm font-semibold tracking-wide`
}

/**
 * @param {object} props
 * @param {"default" | "primary" | "secondary"} props.variant
 */
export const Button = forwardRef(function Btn(
  { children, type = 'button', loading = false, variant = 'default', ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} className={getClasses(variant)} {...props}>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </button>
  )
})

export const LinkButton = forwardRef(function LinkBtn(
  { children, loading = false, variant = 'primary', ...props },
  ref,
) {
  return (
    <a ref={ref} className={getClasses(variant)} {...props}>
      {loading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </a>
  )
})
