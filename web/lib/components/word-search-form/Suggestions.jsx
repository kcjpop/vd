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
      {cachedOptions.length > 0 && (
        <p className="mb-2 hidden text-right text-sm text-slate-500 lg:block">
          Bạn có thể dùng phím mũi tên ↑ ↓ để chọn từ gợi ý ☺️
        </p>
      )}

      {cachedOptions.length === 0 && (
        <p className="mb-2 text-red-700">
          Không tìm thấy gợi ý cho từ khóa này 😨 Bạn vui lòng kiểm tra lại, hay
          có khi đây là một từ mới chăng?
        </p>
      )}

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
