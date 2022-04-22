import { QueryClient, QueryClientProvider } from 'react-query'
import { render as baseRender, waitFor } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

export * from '@testing-library/react'
export { userEvent } from '@testing-library/user-event'

// Should have one central place to share all Providers in both app and tests
const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

/**
 * Pretty much the same as `render` function above, but all translation messages
 * are displayed as message ID, which is easier to assert in tests.
 */
function onIntlError(errorMessage) {
  if (['MISSING_TRANSLATION', 'FORMAT_ERROR'].includes(errorMessage?.code)) {
    return
  }
  console.error(errorMessage)
}

const AllTheProviders = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      <IntlProvider
        locale="en"
        defaultLocale="en"
        messages={{}}
        onError={onIntlError}>
        {children}
      </IntlProvider>
    </QueryClientProvider>
  )
}

// Must have have a different name, as it's conflicted with `render` in
// @testing-library/react
export const rdr = (ui, options) =>
  baseRender(ui, { wrapper: AllTheProviders, ...options })

/**
 * Wait for useQuery to finish with response
 *
 * @see https://react-query.tanstack.com/guides/testing#testing-load-more--infinite-scroll
 * @param {Function} fn
 * @returns
 */
export async function waitForNetworkQuery(fn) {
  await waitFor(() => {})
  return waitFor(fn)
}
