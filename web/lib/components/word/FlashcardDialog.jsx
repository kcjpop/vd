import { Dialog } from '../common/Dialog'
import { useTranslation } from '../../i18n'

export function FlashcardDialog({ open, onOpenChange }) {
  const { _e } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="p-2">
        <h2 className="font-bold">{_e('flashcard.create')}</h2>
        <form className="flex w-80 flex-col gap-2">
          <label className="">{_e('flashcard.set')}</label>
          <div className="flex items-center">
            <select name="" className="flex-1">
              <option value="">animals</option>
              <option value="">fruits</option>
            </select>

            <button>Add new set</button>
          </div>

          <label className="">{_e('flashcard.word')}</label>
          <input type="text" className="rounded bg-slate-200" />
          <label className="">{_e('flashcard.definition')}</label>
          <textarea name="" id="" className="rounded bg-slate-200"></textarea>

          <button className="bg-sky-200">{_e('flashcard.add')}</button>
        </form>
      </div>
    </Dialog>
  )
}
