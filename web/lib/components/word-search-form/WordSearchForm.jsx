import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  useDismiss,
  useInteractions,
  useFloating,
  shift,
  offset,
  size,
} from '@floating-ui/react-dom-interactions'

import { SearchIcon } from '../common/Icons'
import { RecentlyViewed } from './RecentlyViewed'

import s from './WordSearchForm.module.css'

export function WordSearchForm() {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [sizeData, setSizeData] = useState()
  const { x, y, refs, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [shift(), offset(4), size({ apply: setSizeData, padding: 10 })],
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useDismiss(context),
  ])

  const doSubmit = (e) => {
    e.preventDefault()

    const word = e.target.elements.keyword.value.trim().toLocaleLowerCase()
    if (word !== '')
      router.push({
        pathname: '/w/[word]',
        query: { ...router.query, word },
      })
  }

  return (
    <form onSubmit={doSubmit} autoComplete="off">
      <div className="relative mb-2">
        <input
          {...getReferenceProps({ ref: reference })}
          onFocus={() => setOpen(true)}
          onBlur={(e) => {
            if (!refs.floating.current?.contains(e.relatedTarget)) {
              setOpen(false)
            }
          }}
          name="keyword"
          id="keyword"
          type="search"
          required
          placeholder="Bạn muốn tra gì nè?"
          className="w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-10 placeholder-slate-400 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button type="submit" className="absolute inset-y-0 right-0 p-2">
          <SearchIcon />
        </button>
      </div>

      {open && (
        <div
          className={`rounded border border-slate-200 bg-white p-4 shadow-md ${s.formAnimation}`}
          {...getFloatingProps({
            ref: floating,
            style: {
              position: strategy,
              left: x ?? '',
              top: y ?? '',
              width: sizeData?.reference.width ?? '',
              maxHeight: sizeData?.height ?? '',
              perspective: 1000,
            },
          })}>
          <RecentlyViewed />
        </div>
      )}
    </form>
  )
}
