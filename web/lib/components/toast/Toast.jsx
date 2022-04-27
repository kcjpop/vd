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
  description,
  action,
  actionProps = {},
  type = 'background',
  open = false,
  variant = 'success',
  ...props
}) {
  const { _e } = useTranslation()

  console.log({ ...props })
  return (
    <Root type={type} open={open} {...props} className={s.wrapper}>
      <div className={`${s.main} ${s[variant]}`}>
        <Title className={s.title}>{title || _e('common.notification')}</Title>

        <Close className={s.dismiss} aria-label={_e('toast.dismiss')}>
          <span aria-hidden>
            <CloseIcon />
          </span>
        </Close>

        <Description className={s.description}>
          <div className="my-1">{description}</div>

          <Action className={s.action} {...actionProps}>
            {action}
          </Action>
        </Description>
      </div>
    </Root>
  )
}
