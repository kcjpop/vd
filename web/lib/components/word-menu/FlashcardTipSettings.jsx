import { useContext } from 'react'
import { useTranslation } from '../../i18n'
import { SettingsContext } from '../../context/Settings'
import { ToggleCheckbox } from '../toggle-checkbox/ToggleCheckbox'

export function FlashcardTipSettings() {
  const { _e } = useTranslation()
  const {
    settings: { hideFlashcardTip },
    toggleHideFlashcardTip,
  } = useContext(SettingsContext)

  return (
    <div className="flex items-center justify-between">
      <div className="font-bold">{_e('nav.settings.hideFlashcardTip')}</div>
      <div>
        <div className="float-right">
          <ToggleCheckbox
            checked={hideFlashcardTip}
            onChange={toggleHideFlashcardTip}
          />
        </div>
      </div>
    </div>
  )
}
