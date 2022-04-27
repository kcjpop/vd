import { useTranslation } from '../../i18n'
import { getHideFlashcardTip } from '../../storage'
import { Dialog } from '../common/Dialog'
import { Button } from '../common/Button'

export const InstructionModal = function ({ open, onOpenChange }) {
  const { _e } = useTranslation()

  const toggleHideFlashcardTip = (e) =>
    getHideFlashcardTip().set(e.target.checked)

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      dismissable={false}
      title={_e('flashcard.instructions.howToCreateAFlashcard')}>
      <div className="p-2">
        <p className="my-3 text-sm">
          {_e('flashcard.instructions.clickOnDefinition')}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <input
              className="!border-slate-300"
              type="checkbox"
              value={getHideFlashcardTip().get()}
              onChange={toggleHideFlashcardTip}
            />
            {_e('flashcard.instructions.doNotShowFlashcardInstructionAgain')}
          </div>
          <Button onClick={() => onOpenChange(false)}>
            {_e('common.dismiss')}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
