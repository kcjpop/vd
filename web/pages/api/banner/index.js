import { readdirSync } from 'fs'
import { resolve } from 'path'
import { GlobalFonts } from '@napi-rs/canvas'
import { cache } from '@/lib/utilities/middleware/cache'

import { generateImage } from '@/lib/api/generateImage'
import { getSingleWord } from '@/lib/api/words'

readdirSync(resolve('./public', 'fonts')).forEach((filename) => {
  GlobalFonts.registerFromPath(resolve('./public', 'fonts', filename))
})

async function handler(request, response, lruCache) {
  let input = ''
  const inputs = request.query.w ?? ''

  if (typeof inputs !== 'string') {
    input = inputs[0]
  } else {
    input = inputs
  }

  let imageData = null

  if (lruCache.has(input)) {
    imageData = lruCache.get(input)
  } else {
    const word = await getSingleWord({ word: inputs })

    imageData = generateImage({
      word: word.word,
      definition: word.definitions[0],
    })
    lruCache.set(input, imageData)
  }

  response.setHeader('Content-Type', 'image/png')
  response.send(imageData)
}

export default cache(handler)
