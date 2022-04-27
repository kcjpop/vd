import { cloneElement } from 'react'

export function ButtonGroup({ children, className }) {
  return (
    <div className={`flex ${className}`}>
      {children.map((child, index) =>
        cloneElement(child, {
          className: `border border-slate-300 box-border ${
            index === 0
              ? 'rounded-md !rounded-r-none'
              : index === children.length - 1
              ? 'rounded-md !rounded-l-none'
              : '!rounded-none'
          }`,
        }),
      )}
    </div>
  )
}
