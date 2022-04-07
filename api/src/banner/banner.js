const { readdirSync } = require('fs')
const { resolve } = require('path')
const { GlobalFonts } = require('@napi-rs/canvas')

const { generateImage } = require('./generate')
const { getSingleWord } = require('../words')

const fontPath = resolve(__dirname, './fonts')
readdirSync(fontPath).forEach((filename) => {
  GlobalFonts.registerFromPath(resolve(fontPath, filename))
})

exports.getImage = async function getImage({ word }) {
  const entry = await getSingleWord({ word })

  return generateImage({
    word: entry.word,
    definition: entry.definitions[0],
  })
}
