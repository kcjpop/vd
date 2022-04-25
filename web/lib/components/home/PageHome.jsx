import { OpenGraph } from '@/lib/components/common/OpenGraph'
import { Logo } from '@/lib/components/common/Logo'
import { Wave } from '@/lib/components/common/Wave'

import { WordSearchForm } from '@/lib/components/word-search-form/WordSearchForm'

import { Stats } from './Stats'
import { AuthBanner } from './AuthBanner'

export function PageHome({ opengraph, stats }) {
  return (
    <div className="grid min-h-screen lg:flex lg:flex-col">
      <OpenGraph opengraph={opengraph} />

      <section className="flex flex-col justify-center lg:flex-1">
        <div className="max-w-xl p-4">
          <div className="mb-8">
            <h1 className=" flex items-center gap-2 text-3xl font-bold tracking-wide text-slate-900">
              <Logo /> tudien.io
            </h1>
            <p className="text-sm text-slate-300">beta af, why are you here?</p>
          </div>

          <div className="mb-8">
            <WordSearchForm />
          </div>

          <div className="mb-8">
            <Stats stats={stats} />
          </div>

          <AuthBanner />
        </div>
      </section>

      <section className="flex flex-col ">
        <Wave />

        <div className="flex-1 bg-slate-800" />
      </section>
    </div>
  )
}
