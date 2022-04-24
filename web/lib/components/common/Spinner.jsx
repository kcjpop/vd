import { useTranslation } from '@/lib/i18n'

import styles from './Spinner.module.css'

export function Spinner({ color = 'currentColor', size = 25, speed = 1.5 }) {
  const { _e } = useTranslation()

  return (
    <div
      title={_e('common.loading')}
      className={styles.container}
      style={{
        '--uib-size': size + 'px',
        '--uib-color': color,
        '--uib-speed': speed + 's',
      }}
    />
  )
}
