import { Examples } from './Examples'
import { TextToWords } from './TextToWords'

function Idiom({ idiom }) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {idiom.text.map((t) => (
          <p className="font-semibold text-pink-700" key={t}>
            <TextToWords
              text={t}
              className="underline-offset-2 hover:underline"
            />
          </p>
        ))}
        <div className="ml-4">
          <p className="mb-2">{idiom.translation}</p>

          {idiom.examples && (
            <div className="flex flex-col gap-2">
              <Examples examples={idiom.examples} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Idioms({ idioms }) {
  if (!Array.isArray(idioms) || idioms.length === 0) return null

  return (
    <div className="flex flex-col gap-2 rounded bg-gray-100 p-4">
      <h3 className="font-bold text-sky-600">Cụm từ/ thành ngữ</h3>
      {idioms.map((i, index) => (
        <Idiom key={index} idiom={i} />
      ))}
    </div>
  )
}
