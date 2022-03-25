import Head from 'next/head'
import { Nav } from '../nav/Nav'

export function Layout({ children, navVariant }) {
  return (
    <section>
      <Head>
        <title>vd</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="sticky top-0">
        <Nav variant={navVariant} />
      </header>

      <main>
        <div className="mx-auto max-w-7xl p-4 text-base">{children}</div>
      </main>
    </section>
  )
}
