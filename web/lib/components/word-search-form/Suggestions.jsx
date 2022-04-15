export function Suggestions({
  listRef,
  options,
  getItemProps,
  activeIndex,
  onItemClick,
}) {
  return (
    <div>
      <ul>
        {options?.map((opt, index) => (
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
