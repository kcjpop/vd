import { useState } from 'react'
import { useRouter } from 'next/router'

import { useTranslation } from '../../i18n'

import { SearchIcon } from '../common/Icons'
import { useDropdown, size } from '../useDropdown'

import s from './WordSearchForm.module.css'
import { RecentlyViewed } from './RecentlyViewed'

export function WordSearchForm() {
  const router = useRouter()
  const { _e } = useTranslation()

  const [sizeData, setSizeData] = useState()
  const {
    isOpen,
    referenceProps,
    doOpenDropdown,
    doCloseDropdown,
    floatingProps,
  } = useDropdown({
    middleware: [size({ apply: setSizeData, padding: 10 })],
  })

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
          {...referenceProps()}
          onFocus={doOpenDropdown}
          onBlur={doCloseDropdown}
          name="keyword"
          id="keyword"
          type="search"
          required
          placeholder={_e('wordSearchForm.placeholder')}
          className="w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-10 placeholder-slate-400 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button type="submit" className="absolute inset-y-0 right-0 p-2">
          <SearchIcon />
        </button>
      </div>

      {isOpen && (
        <div
          className={`rounded border border-slate-200 bg-white p-4 shadow-md ${s.formAnimation}`}
          {...floatingProps({
            width: sizeData?.reference.width ?? '',
            maxHeight: sizeData?.height ?? '',
            perspective: 1000,
          })}>
          <RecentlyViewed />
        </div>
      )}
    </form>
  )
}
