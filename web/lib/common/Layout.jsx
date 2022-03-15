import Head from 'next/head'
import { Nav } from './Nav'
import { parse } from '../parser'

export function Layout({ children }) {
  parse()
  return (
    <section className="flex flex-col">
      <Head>
        <title>vd</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Nav />
      </header>

      <main>
        <div className="mx-auto max-w-7xl p-4 text-base">{children}</div>
      </main>
    </section>
  )
}
