import { OpenGraph } from '@/lib/components/common/OpenGraph'
import { Search } from './Search'

export function Page({ opengraph }) {
  return (
    <div className="grid min-h-screen">
      <OpenGraph opengraph={opengraph} />

      <section className="flex flex-col">
        <div className="flex flex-1 flex-col justify-center p-4">
          <div className="max-w-xl">
            <h1 className="mb-4 text-3xl font-bold tracking-wide text-slate-900">
              tudien.io
            </h1>
            <Search />
          </div>
        </div>

        <div className="mt-auto text-slate-800">
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
      </section>

      <section className="bg-slate-800" />
    </div>
  )
}
