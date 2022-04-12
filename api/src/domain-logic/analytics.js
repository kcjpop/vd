const dayjs = require('dayjs')

const supabase = require('./supabase')

const today = () => dayjs().format('YYYY-MM-DD')
const TABLE =
  process.env.NODE_ENV === 'production' ? 'analytics' : 'analytics_dev'

/* Note
 * - Cannot use upsert because in order to make upsert correct, should use id instead
 */

const updateAnalytic = ({ count, ...item }) =>
  supabase
    .from(TABLE)
    .update(
      { ...item, count: count + 1 },
      { returning: 'minimal', count: 'exact' },
    )
    .match({ id: item.id })

const fetchAnalytic = ({ meta, action }) =>
  supabase
    .from(TABLE)
    .select('*', { head: false, count: 'exact' })
    .eq('date', today())
    .eq('meta->>word', meta?.word)
    .eq('action', action)
    .limit(1)

const insertAnalytic = ({ meta, ip, action }) =>
  supabase
    .from(TABLE)
    .insert(
      { date: today(), meta, action, ip },
      { returning: 'minimal', count: 'exact' },
    )

const updateBasicAnalytics = async ({ action, meta, ip }) => {
  try {
    const { error, data, count, status } = await fetchAnalytic({ meta, action })

    if (error) throw error

    if (status < 200 || status >= 300) throw new Error('Internal service error')
    else {
      const { error } = await (count === 1
        ? updateAnalytic({ ...data[0], ip })
        : insertAnalytic({ meta, ip, action }))

      if (error) throw error
    }

    return { error: null }
  } catch (error) {
    // @TODO: Handle error (??)
    return { error }
  }
}

module.exports = { updateBasicAnalytics }
