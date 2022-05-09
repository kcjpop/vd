import { cloneElement } from 'react'
import clsx from 'clsx'

export function ButtonGroup({ children, className }) {
  return (
    <div className={`flex ${className}`}>
      {children.map((child, index) =>
        cloneElement(child, {
          key: `button-${index}`,
          className: `border border-slate-300 box-border ${clsx({
            'rounded-md !rounded-r-none': index === 0,
            'rounded-md !rounded-l-none': index === children.length - 1,
            '!rounded-none': index !== 0 && index !== children.length - 1,
          })}`,
        }),
      )}
    </div>
  )
}
