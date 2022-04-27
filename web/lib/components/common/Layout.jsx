import { useContext } from 'react'
import { Provider as ToastProvider, ToastViewport } from '@radix-ui/react-toast'

import { Nav } from '../nav/Nav'
import { ToastContext } from '../../context/Toast'
import { Toast } from '../toast/Toast'

import { OpenGraph } from './OpenGraph'
import { ErrorBoundary } from './ErrorBoundary'
import { Wave } from './Wave'
import { Loading } from './Loading'

export function Layout({ children, navVariant, opengraph, loading }) {
  const { props: toastProps } = useContext(ToastContext)

  return (
    <section className="flex min-h-screen flex-col justify-between">
      <OpenGraph opengraph={opengraph} />

      <header
        className="sticky top-0"
        style={{ zIndex: 'var(--z-index-navbar)' }}>
        <Nav variant={navVariant} />
      </header>

      <main className="flex-1">
        {loading ? (
          <div className="my-8">
            <Loading />
          </div>
        ) : (
          <ToastProvider swipeDirection="right">
            <div className="mx-auto max-w-7xl p-4 text-base">
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
            <ToastViewport className="fixed top-16 right-0 z-50 m-0 flex w-auto max-w-full list-none flex-col gap-2 p-6" />
            <Toast {...toastProps} />
          </ToastProvider>
        )}
      </main>

      <footer className="text-slate-800">
        <Wave />
      </footer>
    </section>
  )
}
