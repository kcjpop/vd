import { Button } from '../common/Button'
import { VolumnIcon, TrashIcon, EditIcon } from '../common/Icons'

export function FlashcardRow({ flashcard, editable }) {
  return (
    <div
      key={flashcard.id}
      className="grid grid-cols-3 grid-rows-1 rounded-lg bg-slate-100 p-2 shadow hover:bg-slate-200"
      style={{
        gridTemplateColumns: '1fr 1fr min-content',
      }}>
      <div className="flex items-center border-2 border-t-0 border-l-0 border-b-0 border-white px-4">
        {flashcard.word}
      </div>
      <div className="flex items-center border-2 border-t-0 border-l-0 border-b-0 border-white px-4">
        {flashcard.definition}
      </div>
      <div className="flex items-center gap-0.5 px-2">
        <Button>
          <VolumnIcon size="16px" />
        </Button>
        <Button>
          <EditIcon size="16px" />
        </Button>
        <Button>
          <TrashIcon
            size="16px"
            className="text-red-500"
            disabled={!editable}
          />
        </Button>
      </div>
    </div>
  )
}
