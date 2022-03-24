import { QueryClient, QueryClientProvider } from 'react-query'

import '../styles/globals.css'
import { Provider as IntlProvider } from '@/lib/i18n'

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
        <Component {...pageProps} />
      </IntlProvider>
    </QueryClientProvider>
  )
}

export default MyApp
