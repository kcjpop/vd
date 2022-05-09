import { useState, cloneElement } from 'react'
import {
  useFloating,
  useInteractions,
  useHover,
  shift,
  flip,
  offset,
} from '@floating-ui/react-dom-interactions'

export function Tooltip({ children, tooltip, placement = 'top' }) {
  const [open, setOpen] = useState(false)

  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [shift(), flip(), offset(2)],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
  ])

  const referenceProps = () => getReferenceProps({ ref: reference })

  const floatingProps = ({ ...styles }) =>
    getFloatingProps({ ref: floating, style: { ...styles } })

  return (
    <>
      {cloneElement(children, { ...children.props, ...referenceProps() })}
      {open && tooltip && (
        <div
          className="rounded border border-transparent bg-slate-700 px-2 py-1 text-xs text-white"
          {...floatingProps({
            position: strategy,
            top: y ?? '',
            left: x ?? '',
          })}>
          {tooltip}
        </div>
      )}
    </>
  )
}
