import { useIntl, IntlProvider } from 'react-intl'

import en from './en'
import vi from './vi'

const messages = { vi, en }

export function useTranslation() {
  const intl = useIntl()
  const _e = (id, values) => intl.formatMessage({ id, values })
  return { intl, _e }
}

export function Provider({ children }) {
  const locale = 'vi'

  return (
    <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  )
}
