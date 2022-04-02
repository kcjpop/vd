import { readdirSync } from 'fs'
import { resolve } from 'path'
import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { cache } from '@/lib/utilities/middleware/cache'

const IMAGE = { WIDTH: 620, HEIGHT: 451, COLOR: '#E5E5E5' }
const RECT = {
  WIDTH: 600,
  HEIGHT: 431,
  X: 10,
  Y: 10,
  COLOR: '#E0F2FE',
  RADIUS: 8,
}
const MARGIN = { TOP: 40, RIGHT: 70, BOTTOM: 40, LEFT: 70 }
const FONT = 'IBM Plex Sans'
const CONTENT = [
  {
    TYPE: 'line',
    TEXT: 'metaphor',
    COLOR: '#1E293B',
    STYLE: `bold 48px ${FONT}`,
    Y: RECT.X + MARGIN.TOP + 100,
  },
  {
    TYPE: 'line',
    TEXT: 'noun',
    COLOR: '#1E293B',
    STYLE: `italic 18px ${FONT}`,
    Y: RECT.X + MARGIN.TOP + 138,
  },
  {
    TYPE: 'paragraph',
    TEXT: 'a figure of speech in which a word or phrase is applied to something to which it is not literally applicable.',
    COLOR: '#1E293B',
    STYLE: `normal 20px ${FONT}`,
    Y: RECT.X + MARGIN.TOP + 190,
  },
  {
    TYPE: 'line',
    TEXT: 'tudien.io',
    COLOR: '#0369A1',
    STYLE: `bold 32px ${FONT}`,
    Y: RECT.X + MARGIN.TOP + 320,
  },
]

readdirSync(resolve('./public', 'fonts')).forEach((filename) => {
  GlobalFonts.registerFromPath(resolve('./public', 'fonts', filename))
})

function wrapText(ctx, text, x, y, lineheight, maxWidth) {
  const words = [...text.matchAll(/\s?[^\s]+/g)].map(([v]) => v)
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
  const inputs = request.query.t ?? ''

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
    const MAX_WIDTH = RECT.WIDTH - MARGIN.LEFT - MARGIN.RIGHT

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    /* Background */
    ctx.fillStyle = IMAGE.COLOR
    ctx.fillRect(0, 0, IMAGE.WIDTH, IMAGE.HEIGHT)

    /* Rect */
    ctx.lineJoin = 'round'
    ctx.lineWidth = RECT.RADIUS
    ctx.strokeStyle = RECT.COLOR
    ctx.strokeRect(
      RECT.X + RECT.RADIUS / 2,
      RECT.Y + RECT.RADIUS / 2,
      RECT.WIDTH - RECT.RADIUS,
      RECT.HEIGHT - RECT.RADIUS,
    )
    ctx.fillStyle = RECT.COLOR
    ctx.fillRect(
      RECT.X + RECT.RADIUS / 2,
      RECT.Y + RECT.RADIUS / 2,
      RECT.WIDTH - RECT.RADIUS,
      RECT.HEIGHT - RECT.RADIUS,
    )

    CONTENT.forEach((content) => {
      ctx.font = content.STYLE
      ctx.fillStyle = content.COLOR
      if (content.TYPE === 'paragraph') {
        wrapText(
          ctx,
          content.TEXT,
          RECT.X + MARGIN.LEFT,
          content.Y,
          26,
          MAX_WIDTH,
        )
      } else {
        ctx.fillText(content.TEXT, RECT.X + MARGIN.LEFT, content.Y, MAX_WIDTH)
      }
    })

    // ctx.font = `bold 96px`
    // ctx.fillStyle = COLOR.TEXT
    // ctx.fillText('dictionary', MARGIN.LEFT, MARGIN.TOP + 120, MAX_WIDTH)

    // ctx.font = `bold italic 48px`
    // ctx.fillStyle = COLOR.TEXT
    // ctx.fillText(
    //   '/ ˈdɪk ʃəˌnɛr i /',
    //   MARGIN.LEFT,
    //   MARGIN.TOP + 120 + 76,
    //   MAX_WIDTH,
    // )

    // ctx.font = 'normal 24px'
    // ctx.fillStyle = COLOR.TEXT

    // wrapText(
    //   ctx,
    //   'a book, optical disc, mobile device, or online lexical resource containing a selection of the words of a language, giving information about their meanings, pronunciations, etymologies, inflected forms, derived forms, etc., expressed in either the same or another language; lexicon; glossary.',
    //   MARGIN.LEFT,
    //   MARGIN.TOP + 120 + 76 + 46,
    //   34,
    //   MAX_WIDTH,
    // )

    imageData = canvas.toBuffer('image/png')
    lruCache.set(input, imageData)
  }

  response.setHeader('Content-Type', 'image/png')
  response.send(imageData)
}

export default cache(handler)
