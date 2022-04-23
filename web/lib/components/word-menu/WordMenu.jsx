import Link from 'next/link'

import { SettingsIcon } from '../common/Icons'
import { useDropdown } from '../useDropdown'

import { SpeechSettings } from './SpeechSettings'
import { DictSelect } from './DictSelect'

export function WordMenu() {
  const {
    isOpen,
    referenceProps,
    floatingProps,
    doOpenDropdown,
    doCloseDropdown,
  } = useDropdown({ placement: 'bottom-end' })
  return (
    <div className="relative">
      <button
        onClick={doOpenDropdown}
        onBlur={doCloseDropdown}
        type="button"
        className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 p-2 text-orange-700 hover:border-orange-300 lg:rounded lg:px-4"
        {...referenceProps()}>
        <span className="hidden text-sm font-semibold tracking-wide lg:inline-block">
          Tùy chọn
        </span>
        <SettingsIcon />
      </button>

      {isOpen && (
        <div
          className="w-80 divide-y divide-dashed rounded border border-slate-200 bg-white p-4 text-gray-800 shadow-lg"
          {...floatingProps()}>
          <div className="mb-2 grid gap-2">
            <DictSelect />

            <SpeechSettings />
          </div>

          <div className="flex flex-col">
            <Link href="/">
              <a className="rounded p-2 hover:bg-slate-200">
                🤩 Thêm định nghĩa mới
              </a>
            </Link>

            <Link href="/">
              <a className="rounded p-2 hover:bg-slate-200">
                🥳 Thêm ví dụ mới
              </a>
            </Link>

            <Link href="/">
              <a className="rounded p-2 hover:bg-slate-200">
                😨 Báo định nghĩa sai
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
