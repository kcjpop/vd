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
        </SettingsProvider>
      </IntlProvider>
    </QueryClientProvider>
  )
}

export default MyApp
