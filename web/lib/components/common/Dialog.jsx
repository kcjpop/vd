import { cloneElement } from 'react'

import {
  useFloating,
  useInteractions,
  useClick,
  useFocusTrap,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
} from '@floating-ui/react-dom-interactions'

import { CloseIcon } from './Icons'

export function Dialog({ render, open, onOpenChange, children }) {
  const { floating, context } = useFloating({
    open,
    onOpenChange,
  })

  const id = useId()
  const labelId = `${id}-label`
  const descriptionId = `${id}-description`

  const { getFloatingProps } = useInteractions([
    useFocusTrap(context),
    useRole(context),
    useDismiss(context),
  ])

  return (
    <FloatingPortal>
      {open && (
        <FloatingOverlay
          lockScroll
          style={{
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(0, 0, 0, 0.44)',
            boxShadow:
              'rgba(14, 18, 22, 0.35) 0px 10px 38px -10px, rgba(14, 18, 22, 0.2) 0px 10px 20px -15px',
            zIndex: 'var(--z-index-dialog)',
          }}>
          <div
            {...getFloatingProps({
              ref: floating,
              className: 'Dialog',
              'aria-labelledby': labelId,
              'aria-describedby': descriptionId,
            })}>
            <div className="relative m-4 rounded bg-white p-2 shadow-md lg:m-0 lg:max-w-5xl">
              {cloneElement(children)}

              <button
                className="absolute top-2 right-2 rounded-full bg-slate-200 p-2 hover:bg-slate-300"
                onClick={() => onOpenChange(false)}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  )
}
