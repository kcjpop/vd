import { parse } from '@/lib/parser'
import { words } from '@/lib/db'

function run() {
  for (const word of Object.values(words)) {
    try {
      parse(word)
    } catch (e) {
      console.error('Error while parsing: ' + word)
      console.error(e)
      return
    }
  }
}

export default function Playground() {
  run()
  return <p>Open Web Inspect</p>
}
