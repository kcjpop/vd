import Script from 'next/script'
import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'
import { Provider as IntlProvider } from '@/lib/i18n'
import { SettingsProvider } from '@/lib/context/Settings'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider>
        <SettingsProvider>
          <Component {...pageProps} />
          <Script
            data-website-id="6b437211-920f-4336-88e6-921624a3ad37"
            src="https://analytics.tudien.io/umami.js"
          />
        </SettingsProvider>
      </IntlProvider>
    </QueryClientProvider>
  )
}

export default MyApp
