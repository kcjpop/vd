import { createCanvas } from '@napi-rs/canvas'
import { BANNER_FONT } from '../config'

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

function generateContent(word, definition) {
  return [
    {
      TYPE: 'line',
      TEXT: word,
      COLOR: '#1E293B',
      STYLE: `bold 48px ${BANNER_FONT}`,
      Y: RECT.X + MARGIN.TOP + 100,
    },
    {
      TYPE: 'line',
      TEXT: definition?.partOfSpeech ?? '',
      COLOR: '#1E293B',
      STYLE: `italic 18px ${BANNER_FONT}`,
      Y: RECT.X + MARGIN.TOP + 138,
    },
    {
      TYPE: 'paragraph',
      TEXT: definition?.definitions?.[0]?.meaning ?? '',
      COLOR: '#1E293B',
      STYLE: `normal 20px ${BANNER_FONT}`,
      Y: RECT.X + MARGIN.TOP + 200,
    },
    {
      TYPE: 'line',
      TEXT: 'tudien.io',
      COLOR: '#0369A1',
      STYLE: `bold 32px ${BANNER_FONT}`,
      Y: RECT.X + MARGIN.TOP + 320,
    },
  ]
}

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

export function generateImage({ word, definition }) {
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

  generateContent(word, definition).forEach((content) => {
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

  return canvas.toBuffer('image/png')
}
