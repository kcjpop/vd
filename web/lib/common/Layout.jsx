import Head from 'next/head'
import { Nav } from './Nav'

export function Layout({ children }) {
  return (
    <section className="flex flex-col">
      <Head>
        <title>vd</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Nav />
      </header>

      <main className="flex w-full flex-col">{children}</main>
    </section>
  )
}
