import { Sets } from './Sets'
import { Button } from '../common/Button'

export function Pagination({ chunks, currentPage, next, prev }) {
  const currentChunk = chunks[currentPage]

  return (
    <div className="h-full w-full">
      <Sets flashcardSets={currentChunk} />
      <div
        className={`mt-5 flex w-full flex-row items-center justify-center gap-5 ${
          chunks.length === 1 && 'hidden'
        }`}>
        <Button
          onClick={prev}
          disabled={!chunks[currentPage - 1]}
          className="mr-3 inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg
            className="mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"></path>
          </svg>
          Previous
        </Button>
        <Button
          onClick={next}
          disabled={!chunks[currentPage + 1]}
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
          <svg
            className="ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"></path>
          </svg>
        </Button>
      </div>
    </div>
  )
}
