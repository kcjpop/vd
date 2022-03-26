import { createCanvas } from '@napi-rs/canvas'
import { cache } from '@/lib/utilities/middleware/cache'

const IMAGE = { WIDTH: 1200, HEIGHT: 600 }
const COLOR = { TEXT: '#E5E7EB', BACKGROUND: '#1F2937' }
const MARGIN = { TOP: 96, RIGHT: 70, BOTTOM: 96, LEFT: 70 }

function wrapText(ctx, text, x, y, lineheight, maxWidth) {
  let words = [...text.matchAll(/\s?[^\s]+/g)].map(([v]) => v)
  let line = ''

  do {
    const word = words.shift()
    const { width: length } = ctx.measureText(line + word)

    if (length > maxWidth) {
      ctx.fillText(line, x, y, maxWidth)
      y += lineheight
      line = word.trim()
    } else {
      line += word
    }
  } while (words.length > 0)

  if (line !== '') {
    ctx.fillText(line, x, y, maxWidth)
  }
}

async function handler(request, response, lruCache) {
  let input = ''
  const inputs = request.query['t'] ?? ''

  if (typeof inputs !== 'string') {
    input = inputs[0]
  } else {
    input = inputs
  }

  let imageData = null

  if (lruCache.has(input)) {
    imageData = lruCache.get(input)
  } else {
    const canvas = createCanvas(IMAGE.WIDTH, IMAGE.HEIGHT)
    const ctx = canvas.getContext('2d')
    const MAX_WIDTH = IMAGE.WIDTH - MARGIN.LEFT - MARGIN.RIGHT

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    ctx.fillStyle = COLOR.BACKGROUND
    ctx.fillRect(0, 0, IMAGE.WIDTH, IMAGE.HEIGHT)

    ctx.font = `bold 36px`
    ctx.fillStyle = COLOR.TEXT
    ctx.fillText('tudien.io', MARGIN.LEFT, MARGIN.TOP, MAX_WIDTH)

    ctx.font = `bold 96px`
    ctx.fillStyle = COLOR.TEXT
    ctx.fillText('dictionary', MARGIN.LEFT, MARGIN.TOP + 120, MAX_WIDTH)

    ctx.font = `bold italic 48px`
    ctx.fillStyle = COLOR.TEXT
    ctx.fillText(
      '/ ˈdɪk ʃəˌnɛr i /',
      MARGIN.LEFT,
      MARGIN.TOP + 120 + 76,
      MAX_WIDTH,
    )

    ctx.font = 'normal 24px'
    ctx.fillStyle = COLOR.TEXT

    wrapText(
      ctx,
      'a book, optical disc, mobile device, or online lexical resource containing a selection of the words of a language, giving information about their meanings, pronunciations, etymologies, inflected forms, derived forms, etc., expressed in either the same or another language; lexicon; glossary.',
      MARGIN.LEFT,
      MARGIN.TOP + 120 + 76 + 46,
      34,
      MAX_WIDTH,
    )

    imageData = canvas.toBuffer('image/png')
    lruCache.set(input, imageData)
  }

  response.setHeader('Content-Type', 'image/png')
  response.send(imageData)
}

export default cache(handler)
