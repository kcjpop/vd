import { forwardRef } from 'react'

export const Input = forwardRef(function Component(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`my-1 max-w-full rounded border border-slate-400 p-3 py-1 focus:border-slate-600 ${className}`}
      {...props}
    />
  )
})
