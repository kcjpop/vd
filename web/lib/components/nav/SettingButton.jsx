import { useState, useEffect, useRef } from 'react'
import { useFloating, offset, shift } from '@floating-ui/react-dom'

import { SettingsIcon } from '../common/Icons'
import { useTranslation } from '../../i18n'

import { Settings } from './Settings'

export function SettingButton() {
  const { _e } = useTranslation()
  const { x, y, reference, floating, strategy } = useFloating({
    placement: 'bottom-end',
    middleware: [offset(5), shift()],
  })
  const containerRef = useRef()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const listener = (e) => {
      const element = containerRef.current
      if (!element || element.contains(e.target)) return

      setOpen(false)
    }

    document.addEventListener('touchend', listener)
    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('touchend', listener)
      document.removeEventListener('click', listener)
    }
  }, [containerRef])

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="rounded bg-gray-900 p-2"
        title={_e('nav.settings')}
        ref={reference}>
        <SettingsIcon />
      </button>

      {open && (
        <div
          className="w-80 rounded bg-white p-4 text-gray-800 drop-shadow"
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}>
          <Settings />
        </div>
      )}
    </div>
  )
}
