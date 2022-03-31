import { useRouter } from 'next/router'

import { useTranslation } from '@/lib/i18n'
import { ENABLED_DICTS } from '@/lib/config'

import { LinkToWord } from '../common/LinkToWord'
import { ChevronDownIcon } from '../common/Icons'
import * as DropdownMenu from '../dropdown-menu'

export function DictMenu() {
  const router = useRouter()
  const { _e } = useTranslation()

  const dicts = ENABLED_DICTS.map((value) => ({
    value,
    label: _e(`dict.${value}`),
  }))

  const currentDict = _e(`dict.${router.query.dict ?? ENABLED_DICTS[0]}`)

  return (
    <div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 rounded bg-sky-100 py-1 px-2 text-sky-600"
            title={_e('dictMenu.pick')}>
            {currentDict} <ChevronDownIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <div className="mt-2 flex w-full flex-col rounded bg-white drop-shadow">
            <p className="border-b p-2 text-sm font-semibold text-gray-700">
              {_e('dictMenu.pick')}
            </p>
            {dicts.map((dict) => (
              <LinkToWord
                query={{ dict: dict.value }}
                key={dict.value}
                className="p-2">
                {dict.label}
              </LinkToWord>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
