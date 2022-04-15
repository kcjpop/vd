import { useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import debounce from 'lodash/debounce'
import {
  useDismiss,
  useInteractions,
  useFloating,
  shift,
  flip,
  size,
  offset as offsetMiddleware,
  useListNavigation,
} from '@floating-ui/react-dom-interactions'

import { fetchWordSuggestions } from '@/lib/api'
import { useTranslation } from '@/lib/i18n'
import { SearchIcon } from '@/lib/components/common/Icons'

import s from './WordSearchForm.module.css'
import { RecentlyViewed } from './RecentlyViewed'
import { Suggestions } from './Suggestions'

export function WordSearchForm() {
  const router = useRouter()
  const { _e } = useTranslation()
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword, _setDebouncedKeyword] = useState('')

  // Because `debounce` stores an internal counter, we need to keep it the same
  // in every re-render.
  const setDebouncedKeyword = useMemo(
    () => debounce(_setDebouncedKeyword, 300),
    [],
  )

  const { data: options } = useQuery(
    ['search-suggestions', debouncedKeyword],
    async () => fetchWordSuggestions(debouncedKeyword),
    {
      enabled: debouncedKeyword.length > 0,
      retry: 0,
    },
  )

  const listRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(null)

  const [sizeData, setSizeData] = useState()

  const [open, setOpen] = useState(false)

  const { x, y, refs, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      shift(),
      flip(),
      offsetMiddleware(4),
      size({ apply: setSizeData, padding: 10 }),
    ],
  })

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useDismiss(context),
      useListNavigation(context, {
        listRef,
        activeIndex,
        onNavigate: setActiveIndex,
        virtual: true,
        loop: true,
      }),
    ],
  )

  const referenceProps = () => getReferenceProps({ ref: reference })

  const floatingProps = (style = {}) =>
    getFloatingProps({
      ref: floating,
      style: {
        position: strategy,
        left: x ?? '',
        top: y ?? '',
        ...style,
      },
    })

  const doOpenDropdown = () => setOpen(true)

  const doCloseDropdown = (e) => {
    if (!refs.floating.current?.contains(e.relatedTarget)) {
      setOpen(false)
    }
  }

  const doSubmit = (e) => {
    e.preventDefault()

    const word =
      activeIndex != null && options[activeIndex]
        ? options[activeIndex]
        : e.target.elements.keyword.value.trim().toLocaleLowerCase()

    if (word !== '') doNavigateToWord(word)
  }

  const doNavigateToWord = (word) =>
    router.push({
      pathname: '/w/[word]',
      query: { ...router.query, word },
    })

  const doSearch = (e) => {
    setKeyword(e.target.value)
    setDebouncedKeyword(e.target.value)
  }

  return (
    <form onSubmit={doSubmit} autoComplete="off">
      <div className="relative mb-2">
        <input
          {...referenceProps()}
          name="keyword"
          id="keyword"
          type="search"
          required
          value={keyword}
          placeholder={_e('wordSearchForm.placeholder')}
          className="w-full rounded-md border border-slate-300 bg-white py-2 pl-2 pr-10 text-lg placeholder-slate-400 shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          onFocus={doOpenDropdown}
          onBlur={doCloseDropdown}
          onChange={doSearch}
        />
        <button type="submit" className="absolute inset-y-0 right-0 p-2">
          <SearchIcon />
        </button>
      </div>

      {open && (
        <div
          className={`rounded border border-slate-200 bg-white p-4 shadow-md ${s.formAnimation}`}
          {...floatingProps({
            width: sizeData?.reference.width ?? '',
            maxHeight: sizeData?.height ?? '',
            perspective: 1000,
          })}>
          {keyword.length > 0 ? (
            <Suggestions
              listRef={listRef}
              options={options}
              getItemProps={getItemProps}
              activeIndex={activeIndex}
              onItemClick={doNavigateToWord}
            />
          ) : (
            <RecentlyViewed />
          )}
        </div>
      )}
    </form>
  )
}
