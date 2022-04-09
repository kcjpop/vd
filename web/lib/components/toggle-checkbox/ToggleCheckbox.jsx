import s from './style.module.css'

export function ToggleCheckbox({ checked, onChange, disabled }) {
  return (
    <div className={s.formSwitch}>
      <input
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        type="checkbox"
        role="switch"
        className={`${s.formCheckInput} float-left -ml-10 h-5 w-9 cursor-pointer appearance-none rounded-full bg-white bg-gray-300 bg-contain bg-no-repeat align-top shadow-sm focus:outline-none`}
      />
    </div>
  )
}
