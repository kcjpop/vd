import s from './style.module.css'

export function ToggleCheckbox({ checked, onChange }) {
  const doChange = (e) => {
    onChange(e.target.checked)
  }

  return (
    <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
      <input
        type="checkbox"
        name="toggle"
        className={`absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white ${s.toggleCheckbox}`}
        checked={checked}
        onChange={doChange}
      />
      <label
        htmlFor="toggle"
        className={`block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300 ${s.toggleLabel}`}
      />
    </div>
  )
}
