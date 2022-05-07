import { useState, cloneElement, useRef } from 'react'
import {
  useFloating,
  useInteractions,
  useHover,
  shift,
  flip,
  offset,
  arrow,
} from '@floating-ui/react-dom-interactions'

export function Tooltip({ children, tooltip, placement = 'top' }) {
  const [open, setOpen] = useState(false)
  const arrowRef = useRef(null)

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [
      shift(),
      flip(),
      offset(2),
      arrow({ element: arrowRef, padding: 2 }),
    ],
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
          <div
            ref={arrowRef}
            className="absolute h-3 w-6 bg-slate-700"
            style={{
              top: arrowY ?? '',
              left: arrowX ?? '',
              clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
            }}
          />
        </div>
      )}
    </>
  )
}
