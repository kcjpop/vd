import { Alert } from './Alert'
import { useTranslation } from '../../i18n'

const ERROR_MAPS = new Map([
  ['MAX_ALLOWED_SETS_CREATED', 'flashcardset.error.exceedMaxNumberOfSets'],
  [
    'UNAUTHORIZED_MODIFY_FLASHCARDS',
    'flashcard.errors.onlyCreatorIsAllowedToAddModifyFlashcards',
  ],
])

export const SupabaseAlert = function ({ error, defaultMessage }) {
  const { _e } = useTranslation()

  const message = ERROR_MAPS.has(error.message)
    ? _e(ERROR_MAPS.get(error.message))
    : defaultMessage

  return <Alert variant="danger">{message}</Alert>
}
