import { Dialog } from '../common/Dialog'
import { ZapIcon } from '../common/Icons'

function Content({ close }) {
  return (
    <div className="p-2">
      <h2 className="font-bold">Tạo flashcard</h2>
      <form className="flex w-80 flex-col gap-2">
        <label className="">Từ</label>
        <input type="text" className="rounded bg-slate-200" />
        <label className="">Định nghĩa</label>
        <textarea name="" id="" className="rounded bg-slate-200"></textarea>

        <button className="bg-sky-200">Thêm</button>
      </form>
    </div>
  )
}

export function FlashcardDialog() {
  return (
    <Dialog render={({ close }) => <Content close={close} />}>
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 p-2 text-orange-700 hover:border-orange-300 lg:rounded lg:px-4">
        <span className="hidden text-sm font-semibold tracking-wide lg:inline-block">
          Tạo flashcard
        </span>
        <ZapIcon />
      </button>
    </Dialog>
  )
}
