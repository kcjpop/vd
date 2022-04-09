import { useTranslation } from '../../i18n'

export function Stats({ stats }) {
  const { _e } = useTranslation()

  return (
    <div className="absolute bottom-0 right-0 hidden text-white">
      {Object.entries(stats).map(([db, count]) => (
        <div
          key={`${db}-${count}`}
          className="grid grid-cols-2 text-left text-sm font-bold">
          <span className="">{db}</span>
          <span className="text-right text-sm font-thin">
            {count}&nbsp;{_e('common.words')}
          </span>
        </div>
      ))}
    </div>
  )
}
