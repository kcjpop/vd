import * as DropdownMenu from '../dropdown-menu'
import { SettingsIcon } from '../common/Icons'
import { useTranslation } from '../../i18n'

import { Settings } from './Settings'

export function SettingButton() {
  const { _e } = useTranslation()

  return (
    <div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            type="button"
            className="rounded bg-gray-900 p-2"
            title={_e('nav.settings')}>
            <SettingsIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <div className="mt-1 w-80 rounded bg-white p-4 text-gray-800 drop-shadow lg:w-60">
            <Settings />
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}
