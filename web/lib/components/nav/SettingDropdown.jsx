import { SettingsIcon } from '../common/Icons'
import { useTranslation } from '../../i18n'

import { Settings } from './Settings'
import { useDropdown } from '../useDropdown'

export function SettingDropdown() {
  const { _e } = useTranslation()

  const {
    isOpen,
    referenceProps,
    doOpenDropdown,
    doCloseDropdown,
    floatingProps,
  } = useDropdown({ placement: 'bottom-end' })

  return (
    <div className="relative">
      <button
        {...referenceProps()}
        onClick={doOpenDropdown}
        onBlur={doCloseDropdown}
        type="button"
        className="rounded bg-gray-900 p-2"
        title={_e('nav.settings')}>
        <SettingsIcon />
      </button>

      {isOpen && (
        <div
          className="w-80 rounded bg-white p-4 text-gray-800 drop-shadow lg:w-72"
          {...floatingProps()}>
          <Settings />
        </div>
      )}
    </div>
  )
}
