import { Dialog } from '../common/Dialog'

export function FlashcardDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="p-2">
        <h2 className="font-bold">Tạo flashcard</h2>
        <form className="flex w-80 flex-col gap-2">
          <label className="">Flashcard Set</label>
          <div className="flex items-center">
            <select name="" className="flex-1">
              <option value="">animals</option>
              <option value="">fruits</option>
            </select>

            <button>Add new set</button>
          </div>

          <label className="">Từ</label>
          <input type="text" className="rounded bg-slate-200" />
          <label className="">Định nghĩa</label>
          <textarea name="" id="" className="rounded bg-slate-200"></textarea>

          <button className="bg-sky-200">Thêm</button>
        </form>
      </div>
    </Dialog>
  )
}
