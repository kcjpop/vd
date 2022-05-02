import { Alert } from './Alert'
import { useTranslation } from '../../i18n'

export const SupabaseAlert = function ({ error, defaultMessage }) {
  const { _e } = useTranslation()

  switch (error.message) {
    case 'MAX_ALLOWED_SETS_CREATED': {
      return (
        <Alert variant="danger">
          {_e('flashcardset.error.exceedMaxNumberOfSets')}
        </Alert>
      )
    }
    case 'UNAUTHORIZED_MODIFY_FLASHCARDS': {
      return (
        <Alert variant="danger">
          {_e('flashcard.errors.onlyCreatorIsAllowedToAddModifyFlashcards')}
        </Alert>
      )
    }
    default: {
      return <Alert variant="danger">{defaultMessage}</Alert>
    }
  }
}
