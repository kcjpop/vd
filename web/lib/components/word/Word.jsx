/*

interface Example {
  text: string
  translation: string
}

interface Definition {
  meaning: string
  examples?: Example[]
}

interface Idiom {
  text: string[]
  definitions?: Definition[]
}

interface WordDefinition {
  partOfSpeech: string
  definitions: Definition[]
  idioms: Idioms[]
}

interface Word {
  word: string
  ipa: string
  definitions: WordDefinition[]
}

*/
import { useRouter } from 'next/router'
import { VerbTenses } from './VerbTenses'
import { Speech } from './Speech'

const mock = {
  word: 'all',
  ipa: 'ɔ:l',
  definitions: [
    {
      partOfSpeech: 'ngoại động từ',
      definitions: [
        {
          meaning: 'đề địa chỉ',
          examples: [
            {
              text: 'to a letter',
              translation: 'đề địa chỉ trên một bức thư',
            },
          ],
        },
        {
          meaning: 'gửi',
          examples: [
            {
              text: 'to address a letter to somebody',
              translation: 'gửi một bức thư cho ai',
            },
          ],
        },
        {
          meaning: 'xưng hô, gọi',
          examples: [
            {
              text: 'how to address an ambassador',
              translation: 'xưng hô như thế nào với một đại sứ',
            },
          ],
        },
        {
          meaning: 'nói với, nói chuyện với, diễn thuyết trước; viết cho',
          examples: [
            {
              text: 'to oneself to someone',
              translation: 'nói với ai; viết (thư) cho ai',
            },
            {
              text: 'to address an audience',
              translation: 'nói với thính giả, diễn thuyết trước thính giả',
            },
          ],
        },
        {
          meaning: 'to address oneself to chăm chú, toàn tâm toàn ý',
          examples: [
            {
              text: 'to address oneself to a task',
              translation: 'toàn tâm toàn ý với nhiệm vụ',
            },
          ],
        },
        {
          meaning: '(thể dục,thể thao) nhắm',
          examples: [
            {
              text: 'to address the ball',
              translation: 'nhắm quả bóng (trước khi đánh gôn)',
            },
          ],
        },
      ],
      idioms: [],
    },
    {
      partOfSpeech: 'tính từ',
      definitions: [
        {
          meaning: 'tất cả, hết thảy, toàn bộ, suốt trọn, mọi',
          examples: [
            {
              text: 'all my life',
              translation: 'suốt đời tôi, trọn đời tôi',
            },
            {
              text: 'all day',
              translation: 'suốt ngày',
            },
            {
              text: 'with all speed',
              translation: 'hết tốc độ',
            },
            {
              text: 'for all that',
              translation: 'mặc dù tất cả những cái đó',
            },
            {
              text: 'all Vietnam',
              translation: 'toàn nước Việt Nam',
            },
            {
              text: 'in all respects',
              translation: 'về mọi phương diện',
            },
          ],
        },
      ],
    },
    {
      partOfSpeech: 'danh từ',
      definitions: [
        {
          meaning: 'tất cả, tất thảy, hết thảy, toàn thể, toàn bộ',
          examples: [
            {
              text: 'all of us',
              translation: 'tất cả chúng tôi; tất cả chúng ta',
            },
            {
              text: 'all is over!',
              translation: 'thế là xong tất cả!',
            },
            {
              text: 'all are unanimous to vote',
              translation: 'tất cả đều nhất trí bầu',
            },
            {
              text: "that's all I know",
              translation: 'đó là tất cả những điều tôi biết',
            },
            {
              text: 'all but he',
              translation: 'tất cả trừ nó ra',
            },
          ],
        },
      ],
      idioms: [
        {
          text: ['above all'],
          definitions: [{ meaning: '(xem) above' }],
        },
        {
          text: ['after all'],
          definitions: [{ meaning: '(xem) after' }],
        },
        {
          text: ['all but'],
          definitions: [
            {
              meaning: 'gần như, hầu như, suýt',
              examples: [
                {
                  text: 'all but impossible',
                  translation: 'gần như không thể làm được',
                },
                {
                  text: 'he was all but drowned',
                  translation: 'hắn suýt chết đuối',
                },
              ],
            },
          ],
        },
        {
          text: ['all and sundry'],
          definitions: [
            {
              meaning: 'toàn thể và từng người một, tất cả và từng cái một',
            },
          ],
        },
        {
          text: ['all one'],
          definitions: [
            {
              meaning: 'cũng vậy thôi',
              examples: [
                {
                  text: "it's all one to me",
                  translation: 'đối với tôi thì cái đó cũng vậy thôi',
                },
                {
                  text: 'at all',
                  translation: 'chút nào, chút nào chăng',
                },
                {
                  text: "I don't know him at all",
                  translation: 'tôi không biết hắn ta một chút nào',
                },
                {
                  text: 'in all',
                  translation: 'tổng cộng, tất cả, cả thảy',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      partOfSpeech: 'phó từ',
      definitions: [
        {
          meaning: 'hoàn toàn, toàn bộ, tất cả, trọn vẹn',
          examples: [
            {
              text: 'to be dressed all in white',
              translation: 'mặc toàn trắng',
            },
            {
              text: "that's all wrong",
              translation: 'cái đó sai cả rồi',
            },
          ],
        },
      ],
      idioms: [
        {
          text: ['all alone'],
          definitions: [
            { meaning: 'một mình, đơn độc' },
            { meaning: 'không ai giúp đỡ, tự làm lấy' },
          ],
        },
        {
          text: ['all at once'],
          definitions: [{ meaning: 'cùng một lúc' }],
        },
        {
          text: ['all over'],
          definitions: [
            {
              meaning: 'khắp cả',
              examples: [
                {
                  text: 'all over the world',
                  translation: 'khắp thế giới',
                },
                {
                  text: 'to be covered all over with mud',
                  translation: 'bùn bẩn khắp người',
                },
              ],
            },
            {
              meaning: 'xong, hết, chấm dứt',
              examples: [
                {
                  text: "it's all over",
                  translation: 'thế là xong, thế là hết',
                },
              ],
            },
            {
              meaning: 'hoàn toàn đúng là, y như hệt',
              examples: [
                {
                  text: 'she is her mother all over',
                  translation: 'cô ta y hệt như bà mẹ',
                },
              ],
            },
          ],
        },
        {
          text: [
            "it's all up with him",
            "it's all over with him",
            "it's all U.P. with him",
          ],
          definitions: [
            {
              meaning:
                '(từ lóng) thế là nó tong rồi, thế là nó tiêu ma rồi thế là nó đi đời rồi',
            },
          ],
        },
      ],
    },
  ],
}

// There might be multiple pronunciation. Support one for now.
function Ipa({ ipa }) {
  return <p>/{ipa}/</p>
}

function Example({ text, translation }) {
  return (
    <div className="ml-4">
      <p>
        {text} = <span className="italic text-stone-700">{translation}</span>
      </p>
    </div>
  )
}

function Definition({ def }) {
  return (
    <div className="ml-4">
      <div className="flex flex-col gap-4">
        <p className="text-rose-600">{def.meaning}</p>

        {def?.examples?.map((ex) => (
          <Example key={ex.text} text={ex.text} translation={ex.translation} />
        ))}
      </div>
    </div>
  )
}

function Idiom({ idiom }) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        {idiom.text.map((t) => (
          <p key={t}>{t}</p>
        ))}
        <div className="ml-4">
          <div className="flex flex-col gap-2">
            {idiom.definitions.map((d) => (
              <Definition key={d.meaning} def={d} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Idioms({ idioms }) {
  if (!Array.isArray(idioms) || idioms.length === 0) return null

  return (
    <div className="flex flex-col gap-2 rounded bg-gray-100 p-4">
      <h3 className="font-bold text-sky-600">thành ngữ</h3>
      {idioms.map((i, index) => (
        <Idiom key={index} idiom={i} />
      ))}
    </div>
  )
}

function WordDefinition({ def, tenses }) {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2 p-4">
          <h3 className="font-bold text-sky-600">{def.partOfSpeech}</h3>

          {def.partOfSpeech.includes('động từ') && (
            <VerbTenses tenses={tenses} />
          )}

          {def.definitions.map((d) => (
            <Definition key={d.meaning} def={d} />
          ))}
        </div>

        <Idioms idioms={def.idioms} />
      </div>
    </div>
  )
}

export function Word(props) {
  const router = useRouter()
  const { word } = router.query

  // Hack while waiting for the whole `word` data coming from props
  const w = { ...mock, ...props.word }

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{word}</h1>
          <Speech word={word} />
        </div>

        <Ipa ipa={w.ipa} />
      </div>

      <div className="flex flex-col gap-4">
        {w.definitions.map((def) => (
          <WordDefinition key={def.partOfSpeech} def={def} tenses={w.tenses} />
        ))}
      </div>
    </div>
  )
}
