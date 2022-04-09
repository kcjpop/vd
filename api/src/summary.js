const EnVi = require('./domain-logic/en-vi')
const Wordnet = require('./domain-logic/wordnet')

exports.getSummary = async function getSummary() {
  return { EnVi: await EnVi.count(), Wordnet: await Wordnet.count() }
}
