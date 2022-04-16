import Link from 'next/link'
import { OpenGraph } from '@/lib/components/common/OpenGraph'
import { Logo } from '@/lib/components/common/Logo'
import { Wave } from '@/lib/components/common/Wave'

import { WordSearchForm } from '@/lib/components/word-search-form/WordSearchForm'

import { Stats } from './Stats'

export function PageHome({ opengraph, stats }) {
  return (
    <div className="grid min-h-screen lg:flex lg:flex-col">
      <OpenGraph opengraph={opengraph} />

      <section className="flex flex-col justify-center lg:flex-1">
        <div className="max-w-xl p-4">
          <h1 className="mb-4 flex items-center gap-2 text-3xl font-bold tracking-wide text-slate-900">
            <Logo /> tudien.io
          </h1>

          <div className="mb-8">
            <WordSearchForm />
          </div>

          <div className="mb-8">
            <Stats stats={stats} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Link href="/auth/register">
                <a className="rounded border border-orange-200 bg-orange-100 p-2 text-sm font-semibold tracking-wide text-orange-700 hover:border-orange-300">
                  Đăng ký tài khoản 🤟
                </a>
              </Link>

              <Link href="/auth">
                <a className="rounded border border-orange-200 bg-orange-100 p-2 text-sm font-semibold tracking-wide text-orange-700 hover:border-orange-300">
                  Đăng nhập 👋
                </a>
              </Link>
            </div>
            <button className="p-2 text-sm text-slate-500">
              <p>Ủa tra từ điển mà cũng cần tài khoản à? 🤔</p>
            </button>
          </div>
        </div>
      </section>

      <section className="flex flex-col ">
        <Wave />

        <div className="flex-1 bg-slate-800" />
      </section>
    </div>
  )
}
