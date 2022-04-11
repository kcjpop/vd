import { supabase } from './supabaseClient'
import { SB_TABLES } from '../config'

function addLeadingZeros(value, digits = 2) {
  return Intl.NumberFormat('default', { minimumIntegerDigits: digits }).format(
    value,
  )
}

function today() {
  const date = new Date()

  const year = date.getFullYear()
  const month = addLeadingZeros(date.getMonth())
  const day = addLeadingZeros(date.getDate())

  return `${year}-${month}-${day}`
}

const fetchWordsOfTheDay = async () =>
  await supabase
    .from(SB_TABLES.AnalyticsDev)
    .select('*', { head: false, count: 'exact' })
    .eq('date', today())
    .limit(10)
    .order('count', { ascending: false })

const updateWord = async ({ word }) =>
  await supabase
    .from(SB_TABLES.AnalyticsDev)
    .update(
      { ...word, count: word.count + 1 },
      { returning: 'minimal', count: 'exact' },
    )
    .match({ id: word.id })

const fetchWord = async ({ word }) =>
  await supabase
    .from(SB_TABLES.AnalyticsDev)
    .select('*', { head: false, count: 'exact' })
    .eq('date', today())
    .eq('word', word)
    .limit(1)

const insertWord = async ({ word }) =>
  await supabase.from(SB_TABLES.AnalyticsDev).insert(
    {
      date: today(),
      count: 1,
      word: word,
      action: 'page-view',
    },
    { returning: 'minimal', count: 'exact' },
  )

export async function getWordsOfTheDay() {
  const { data: words, error } = await fetchWordsOfTheDay()

  if (error) {
    // @TODO: Handle error (??)
    console.error({ error })
  }

  return words
}

export async function updateWordView({ word }) {
  try {
    const { error, data: words, count, status } = await fetchWord({ word })

    if (error) throw error

    if (status < 200 || status >= 300) throw new Error('Internal service error')
    else {
      const { error } = await (count === 1
        ? updateWord({ word: words[0] })
        : insertWord({ word }))

      if (error) throw error
    }

    return { error: null }
  } catch (error) {
    // @TODO: Handle error (??)
    return { error }
  }
}
