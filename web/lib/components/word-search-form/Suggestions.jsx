import { useEffect, useState } from 'react'

export function Suggestions({
  listRef,
  options,
  getItemProps,
  activeIndex,
  onItemClick,
}) {
  const [cachedOptions, setCachedOptions] = useState([])

  useEffect(() => {
    if (options != null) setCachedOptions(options)
  }, [options])

  return (
    <div>
      <ul>
        {cachedOptions.map((opt, index) => (
          <li
            id={opt + '-id'}
            key={opt}
            className={`rounded p-2 ${
              activeIndex === index ? 'bg-sky-100' : ''
            }`}
            {...getItemProps({
              ref(node) {
                listRef.current[index] = node
              },
              onClick: () => onItemClick(opt, index),
            })}>
            {opt}
          </li>
        ))}
      </ul>
    </div>
  )
}
