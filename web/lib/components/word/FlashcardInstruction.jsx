import { forwardRef, useContext } from 'react'

import { useTranslation } from '../../i18n'
import { SettingsContext } from '../../context/Settings'
import { LightbulbIcon } from '../common/Icons'

export const FlashcardInstructionAction = forwardRef(function Action(
  props,
  ref,
) {
  const { _e } = useTranslation()
  const {
    settings: { hideFlashcardTip },
    toggleHideFlashcardTip,
  } = useContext(SettingsContext)

  return (
    <div ref={ref} className="flex items-center gap-2 text-xs text-slate-300">
      <input
        className="!border-slate-300"
        type="checkbox"
        value={hideFlashcardTip}
        onChange={toggleHideFlashcardTip}
      />
      {_e('flashcard.instructions.doNotShowFlashcardInstructionAgain')}
    </div>
  )
})

export function FlashcardInstructionTitle() {
  const { _e } = useTranslation()
  return (
    <div className="flex gap-2">
      <LightbulbIcon size="16px" /> {_e('common.tips')}
    </div>
  )
}

export function FlashcardInstructionDescription() {
  const { _e } = useTranslation()
  return (
    <p className="text-sm">{_e('flashcard.instructions.clickOnDefinition')}</p>
  )
}
