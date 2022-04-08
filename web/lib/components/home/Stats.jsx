import { useTranslation } from '../../i18n'
import s from './stats.module.css'

export function Stats({ stats }) {
  const { _e } = useTranslation()

  return (
    <div className={`absolute bottom-0 right-0 hidden text-white`}>
      {Object.entries(stats).map(([db, count]) => (
        <div key={`${db}-${count}`} className={`text-sm font-bold ${s.row}`}>
          <span className={s.word}>{db}</span>
          <span className={`text-sm font-thin ${s.count}`}>
            {count}&nbsp;{_e('common.words')}
          </span>
        </div>
      ))}
    </div>
  )
}
