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

export function Modal({ title = 'Thông báo', open, onOpenChange, children }) {
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
    useDismiss(context, { escapeKey: false, outsidePointerDown: false }),
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
                'relative m-4 rounded bg-white p-2 shadow-md lg:m-0 lg:max-w-5xl',
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
            </header>

            {cloneElement(children)}
          </section>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  )
}
