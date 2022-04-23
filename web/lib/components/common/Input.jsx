import { forwardRef } from 'react'

export const Input = forwardRef(function Component(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={`max-w-full rounded border border-slate-400 p-2 focus:border-slate-600 ${className}`}
      {...props}
    />
  )
})
