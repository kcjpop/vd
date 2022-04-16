import { useRouter } from 'next/router'

import { useTranslation } from '@/lib/i18n'
import { ENABLED_DICTS } from '@/lib/config'

import { LinkToWord } from '../common/LinkToWord'
import { ChevronDownIcon } from '../common/Icons'
import { useDropdown } from '../useDropdown'

export function DictMenu() {
  const router = useRouter()
  const { _e } = useTranslation()

  const {
    isOpen,
    referenceProps,
    floatingProps,
    doOpenDropdown,
    doCloseDropdown,
  } = useDropdown({ placement: 'bottom-end' })

  const dicts = ENABLED_DICTS.map((value) => ({
    value,
    label: _e(`dict.${value}`),
  }))

  const currentDict = _e(`dict.${router.query.dict ?? ENABLED_DICTS[0]}`)

  return (
    <div className="relative">
      <button
        onClick={doOpenDropdown}
        onBlur={doCloseDropdown}
        type="button"
        className="flex items-center gap-2 rounded border border-sky-600 py-1 px-2 text-sky-600"
        title={_e('dictMenu.pick')}
        {...referenceProps()}>
        {currentDict} <ChevronDownIcon />
      </button>

      {isOpen && (
        <div
          className="mt-2 flex w-48 flex-col bg-white drop-shadow"
          {...floatingProps()}>
          <p className="border-b p-2 text-sm font-semibold text-gray-700">
            {_e('dictMenu.pick')}
          </p>
          {dicts.map((dict) => (
            <LinkToWord
              query={{ dict: dict.value }}
              key={dict.value}
              className="p-2 hover:bg-slate-100">
              {dict.label}
            </LinkToWord>
          ))}
        </div>
      )}
    </div>
  )
}
