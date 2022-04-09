import { OpenGraph } from '@/lib/components/common/OpenGraph'
import { Stats } from '@/lib/components/home/Stats'
import { WordSearchForm } from '../word-search-form/WordSearchForm'

export function Page({ opengraph, stats }) {
  return (
    <div className="grid min-h-screen lg:flex lg:flex-col">
      <OpenGraph opengraph={opengraph} />

      <section className="flex flex-col justify-center lg:flex-1">
        <div className="max-w-xl p-4">
          <h1 className="mb-4 text-3xl font-bold tracking-wide text-slate-900">
            tudien.io
          </h1>

          <div className="mb-8">
            <WordSearchForm />
          </div>

          <Stats stats={stats} />
        </div>
      </section>

      <section className="flex flex-col ">
        <div className="text-slate-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,64L80,58.7C160,53,320,43,480,80C640,117,800,203,960,197.3C1120,192,1280,96,1360,48L1440,0L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

        <div className="flex-1 bg-slate-800" />
      </section>
    </div>
  )
}
