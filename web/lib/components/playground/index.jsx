import React from 'react'
import loadable from '@loadable/component'

import { parse } from '@/lib/parser'
import { words } from '@/lib/db'
import { Layout } from '../common/Layout'

const RJV = loadable(() => import('react-json-view'))
const settings = {
  name: 'Definitions',
  theme: 'harmonic',
  displayObjectSize: false,
  displayDataTypes: false,
  displayArrayKey: false,
}

function debounce(fn, timeout = 200) {
  let timer

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), timeout)
  }
}

export const Playground = function () {
  const [definition, setDefinition] = React.useState(null)
  const [splitted, setSplitted] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const [keyword, setKeyword] = React.useState('')

  function updateDefinition(event) {
    if (event.currentTarget.dataset.definition) {
      setIsError(false)
      setSplitted(event.currentTarget.dataset.definition.split('<br>'))
      const parsed = parse(event.currentTarget.dataset.definition)

      setIsError(!parsed)
      setDefinition(parsed)
    }
  }

  function updateKeyword(event) {
    setKeyword(event.target.value)
  }

  const changeInput = React.useMemo(() => debounce(updateKeyword), [])

  return (
    <Layout>
      <div className="relative grid max-h-screen grid-cols-4 grid-rows-1">
        <div className="col-span-1 h-full overflow-scroll border-r-2 border-slate-300">
          <div className="bg-slate-400 p-2">
            <input
              type="text"
              onChange={changeInput}
              placeholder="Enter keyword"
              className="w-9/12 rounded"
            />
          </div>
          {Object.entries(words)
            .filter(([word]) =>
              keyword !== '' ? word.indexOf(keyword) >= 0 : true,
            )
            .map(([word, definition], index) => (
              <p
                key={`@${word.replace(/\s+/, '-')}_${index}`}
                data-definition={definition}
                className="border-b-2 border-slate-300"
                onClick={updateDefinition}>
                {word}
              </p>
            ))}
        </div>
        <div className="col-span-1 h-full overflow-scroll border-r-2 border-slate-300 p-2">
          {splitted && splitted.map((v, i) => <p key={i}>{v}</p>)}
        </div>
        <div className="col-span-2 h-full overflow-scroll p-2 ">
          {definition && <RJV src={definition} {...settings} />}
          {isError && <p>Open DevTool</p>}
        </div>
      </div>
    </Layout>
  )
}
