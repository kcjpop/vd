import {
  AlertCircleIcon,
  AlertTriangleIcon,
  HelpCircleIcon,
  CheckCircleIcon,
} from './Icons'

const variants = {
  info: {
    bg: 'bg-sky-100 dark:bg-sky-200 text-sky-700',
    icon: <HelpCircleIcon />,
  },
  warning: {
    bg: 'bg-orange-100 dark:bg-orange-200 text-orange-700',
    icon: <AlertCircleIcon />,
  },
  success: {
    bg: 'bg-green-100 dark:bg-green-200 text-green-700',
    icon: <CheckCircleIcon />,
  },
  danger: {
    bg: 'bg-red-100 dark:bg-red-200 text-red-700',
    icon: <AlertTriangleIcon />,
  },
}

/**
 * @param {object} props
 * @param {"info" | "warning" | "success" | "danger"} props.variant
 */
export function Alert({ variant = 'info', children }) {
  const v = variants[variant]

  return (
    <div className={`rounded p-4 ${v.bg}`} role="alert" data-variant={variant}>
      <div className="flex items-center gap-2">
        <div className="w-8">{v.icon}</div>
        <div>{children}</div>
      </div>
    </div>
  )
}
