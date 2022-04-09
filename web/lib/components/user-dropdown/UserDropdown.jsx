import { Fragment } from 'react'
import {
  Root,
  Trigger,
  Content,
  Item,
  Separator,
  Arrow,
} from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/router'

import { UserIcon } from '../common/Icons'
import { useUser, logout } from '../../domain-logic/auth'
import { useTranslation } from '../../i18n'
import s from './style.module.css'

export function UserDropdown() {
  const { user } = useUser({ redirectIfUnauthenticated: false })
  const { _e } = useTranslation()
  const router = useRouter()

  const login = () => router.push('/auth')
  const register = () => router.push('/auth/register')
  const doLogout = async () => {
    await logout()

    router.push('/')
  }

  return (
    <Root className={s.root}>
      <Trigger className={s.trigger} asChild>
        <div className="rounded bg-gray-900 p-2" aria-label={''}>
          <UserIcon></UserIcon>
        </div>
      </Trigger>
      <Content className={s.content}>
        {user ? (
          <Fragment>
            <Item className={s.item}>
              <div className="grid grid-cols-2 gap-2">
                <span>{_e('user.signInAs')}</span>
                <span className="font-bold">{user.user_metadata.fullname}</span>
              </div>
            </Item>
            <Separator />
            <Item className={s.item} onClick={doLogout}>
              {_e('auth.logout')}
            </Item>
          </Fragment>
        ) : (
          <Fragment>
            <Item className={s.item} onClick={login}>
              {_e('auth.login')}
            </Item>
            <Item className={s.item} onClick={register}>
              {_e('auth.register')}
            </Item>
          </Fragment>
        )}
        <Arrow className={s.arrow} offset={10} />
      </Content>
    </Root>
  )
}
