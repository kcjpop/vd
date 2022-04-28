import { cloneElement } from 'react'

import {
  useFloating,
  useInteractions,
  useFocusTrap,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
} from '@floating-ui/react-dom-interactions'

import { CloseIcon } from './Icons'

export function Dialog({
  title = 'Thông báo',
  open,
  onOpenChange,
  children,
  dismissable = true,
}) {
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
    useDismiss(context, { enabled: dismissable }),
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
          <section
            {...getFloatingProps({
              ref: floating,
              className:
                'relative m-4 rounded-md bg-white p-4 shadow-md lg:m-0',
              role: 'dialog',
              'aria-labelledby': labelId,
              'aria-describedby': descriptionId,
            })}>
            <header className="flex items-center">
              {title && (
                <h3 className="px-2 font-bold" id={labelId}>
                  {title}
                </h3>
              )}
              {dismissable && (
                <button
                  className="absolute top-2 right-2 p-2 hover:rounded-full hover:bg-slate-100"
                  onClick={() => onOpenChange(false)}>
                  <CloseIcon />
                </button>
              )}
            </header>

            {cloneElement(children)}
          </section>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  )
}
