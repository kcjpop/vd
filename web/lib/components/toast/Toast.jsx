import { Root, Title, Description, Action, Close } from '@radix-ui/react-toast'
import { CloseIcon } from '../common/Icons'
import { useTranslation } from '../../i18n'
import s from './style.module.css'

/* Props:
 *  - title
 *  - children: content of toast
 *  - action
 *  - actionProps
 *  - type: background | foreground
 *  - open
 *  - variant: success | warning | error
 */

export function Toast({
  title,
  children,
  action,
  actionProps = {},
  type = 'background',
  open = false,
  variant = 'success',
  ...props
}) {
  const { _e } = useTranslation()

  return (
    <Root type={type} open={open} {...props} className={s.wrapper}>
      <div className={`${s.main} ${s[variant]}`}>
        {title && <Title className={s.title}>{title}</Title>}
        <Description className={s.description}>{children}</Description>
        {action && (
          <Action className={s.action} {...actionProps}>
            {action}
          </Action>
        )}
        <Close
          className="rounded-full bg-white p-1 hover:bg-slate-100"
          aria-label={_e('toast.dismiss')}>
          <span aria-hidden>
            <CloseIcon />
          </span>
        </Close>
      </div>
    </Root>
  )
}
