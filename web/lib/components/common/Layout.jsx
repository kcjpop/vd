import { Provider as ToastProvider, ToastViewport } from '@radix-ui/react-toast'

import { Nav } from '../nav/Nav'
import { OpenGraph } from '../common/OpenGraph'
import { ErrorBoundary } from './ErrorBoundary'

export function Layout({ children, navVariant, opengraph }) {
  return (
    <section>
      <OpenGraph opengraph={opengraph} />

      <header className="sticky top-0 z-50">
        <Nav variant={navVariant} />
      </header>

      <main>
        <ToastProvider duration={3000} swipeDirection={'right'}>
          <div className="mx-auto max-w-7xl p-4 text-base">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
          <ToastViewport className="fixed top-16 right-0 z-50 m-0 flex w-60 max-w-full list-none flex-col gap-2 p-6" />
        </ToastProvider>
      </main>
    </section>
  )
}
