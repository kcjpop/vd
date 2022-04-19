import { useFloating, shift } from '@floating-ui/react-dom-interactions'

export function Button({
  children,
  className,
  tooltip,
  variant = 'text',
  type = 'primary',
  ...props
}) {
  const {
    x,
    y,
    reference: ref,
    floating,
    strategy,
  } = useFloating({
    placement: 'top',
    middleware: [shift()],
  })

  return (
    <>
      <button
        type="button"
        ref={ref}
        className={`rounded-lg px-6 py-2 btn--${type} btn--${variant} ${className}`}
        {...props}>
        {children}
      </button>
      {tooltip && (
        <div
          ref={floating}
          style={{ position: strategy, top: y ?? '', left: x ?? '' }}>
          {tooltip}
        </div>
      )}
    </>
  )
}
