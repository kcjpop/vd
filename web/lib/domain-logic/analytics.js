import dayjs from 'dayjs'
import { supabase } from './supabaseClient'

const TABLE =
  process.env.NODE_ENV === 'production' ? 'analytics' : 'analytics_dev'
const today = () => dayjs().format('YYYY-MM-DD')

const fetchWordsOfTheDay = async () =>
  await supabase
    .from(TABLE)
    .select('*', { head: false, count: 'exact' })
    .eq('date', today())
    .limit(10)
    .order('count', { ascending: false })

export async function getWordsOfTheDay() {
  const { data: words, error } = await fetchWordsOfTheDay()

  if (error) {
    // @TODO: Handle error (??)
    console.error({ error })
  }

  return words
}
