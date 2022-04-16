import { useRouter } from 'next/router'
import { ENABLED_DICTS } from '@/lib/config'
import { useTranslation } from '@/lib/i18n'

export function DictSelect() {
  const router = useRouter()
  const { _e } = useTranslation()

  const doChangeDict = (e) => {
    router.push({
      pathname: '/w/[word]',
      query: { ...router.query, dict: e.target.value },
    })
  }

  return (
    <div className="grid items-center gap-2">
      <div className="font-bold">Chọn từ điển</div>

      <select
        className="rounded border-gray-300 bg-slate-200 p-2 focus:border-indigo-500 focus:ring-indigo-500"
        value={router.query.dict}
        onChange={doChangeDict}>
        {ENABLED_DICTS.map((dict) => (
          <option value={dict} key={dict}>
            {_e(`dict.${dict}`)}
          </option>
        ))}
      </select>
    </div>
  )
}
