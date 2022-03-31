import { Nav } from '../nav/Nav'
import { ErrorBoundary } from './ErrorBoundary'
import { OpenGraph } from '@/lib/components/common/OpenGraph'

export function Layout({ children, navVariant, opengraph }) {
  return (
    <section>
      <OpenGraph opengraph={opengraph} />

      <header className="sticky top-0 z-50">
        <Nav variant={navVariant} />
      </header>

      <main>
        <div className="mx-auto max-w-7xl p-4 text-base">
          <ErrorBoundary>{children}</ErrorBoundary>
        </div>
      </main>
    </section>
  )
}
