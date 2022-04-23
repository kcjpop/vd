import { useTranslation } from '../../i18n'
import { Spinner } from './Spinner'

export function Loading() {
  const { _e } = useTranslation()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Spinner className="my-3 aspect-square h-16" />
      <p className="text-center text-3xl font-bold">
        {_e('common.pleaseWait')}
      </p>
    </div>
  )
}
