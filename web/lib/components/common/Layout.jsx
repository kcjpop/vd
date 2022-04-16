import { Provider as ToastProvider, ToastViewport } from '@radix-ui/react-toast'

import { Nav } from '../nav/Nav'

import { OpenGraph } from './OpenGraph'
import { ErrorBoundary } from './ErrorBoundary'
import { Wave } from './Wave'

export function Layout({ children, navVariant, opengraph }) {
  return (
    <section className="flex min-h-screen flex-col justify-between">
      <OpenGraph opengraph={opengraph} />

      <header
        className="sticky top-0"
        style={{ zIndex: 'var(--z-index-navbar)' }}>
        <Nav variant={navVariant} />
      </header>

      <main className="flex-1">
        <ToastProvider duration={3000} swipeDirection={'right'}>
          <div className="mx-auto max-w-7xl p-4 text-base">
            <ErrorBoundary>{children}</ErrorBoundary>
          </div>
          <ToastViewport className="fixed top-16 right-0 z-50 m-0 flex w-60 max-w-full list-none flex-col gap-2 p-6" />
        </ToastProvider>
      </main>

      <footer className="text-slate-800">
        <Wave />
      </footer>
    </section>
  )
}
