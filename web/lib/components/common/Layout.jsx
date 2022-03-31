import { Nav } from '../nav/Nav'
import { OpenGraph } from '@/lib/components/common/OpenGraph'

export function Layout({ children, navVariant, opengraph }) {
  return (
    <section>
      <OpenGraph opengraph={opengraph} />

      <header className="sticky top-0">
        <Nav variant={navVariant} />
      </header>

      <main>
        <div className="mx-auto max-w-7xl p-4 text-base">{children}</div>
      </main>
    </section>
  )
}
