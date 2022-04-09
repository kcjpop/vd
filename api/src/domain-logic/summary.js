const EnVi = require('./en-vi')
const Wordnet = require('./wordnet')

exports.getSummary = async function getSummary() {
  return { EnVi: await EnVi.count(), Wordnet: await Wordnet.count() }
}
