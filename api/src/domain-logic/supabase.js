const { createClient } = require('@supabase/supabase-js')

const url = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(url, anonKey)

module.exports = supabase
