import { useState } from 'react'
import {
  useDismiss,
  useInteractions,
  useFloating,
  shift,
  offset as offsetMiddleware,
  flip,
} from '@floating-ui/react-dom-interactions'

export { size, arrow } from '@floating-ui/react-dom-interactions'

export function useDropdown({ placement, middleware = [], offset = 4 } = {}) {
  const [open, setOpen] = useState(false)

  const { x, y, refs, reference, floating, strategy, context } = useFloating({
    open,
    placement,
    onOpenChange: setOpen,
    middleware: [shift(), flip(), offsetMiddleware(offset), ...middleware],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
  ])

  const referenceProps = () => getReferenceProps({ ref: reference })

  const floatingProps = (style = {}) =>
    getFloatingProps({
      ref: floating,
      style: {
        position: strategy,
        left: x ?? '',
        top: y ?? '',
        ...style,
      },
    })

  const doOpenDropdown = () => {
    setOpen(true)
  }

  const doCloseDropdown = (e) => {
    if (!refs.floating.current?.contains(e.relatedTarget)) {
      setOpen(false)
    }
  }

  return {
    isOpen: open,
    referenceProps,
    doOpenDropdown,
    doCloseDropdown,
    floatingProps,
  }
}
