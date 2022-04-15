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
            {...getItemProps({
              ref(node) {
                listRef.current[index] = node
              },
              onClick: () => {
                console.log(onItemClick)
                onItemClick(opt, index)
              },
            })}
            id={opt + '-id'}
            key={opt}
            style={{ fontWeight: activeIndex === index ? 700 : 400 }}>
            {opt}
          </li>
        ))}
      </ul>
    </div>
  )
}
