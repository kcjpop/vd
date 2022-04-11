import { updateWordView } from '../domain-logic/analytics'

export async function updateWordPageView(req, res) {
  if (req.method === 'POST') {
    try {
      const { word } = req.query

      const { error } = await updateWordView({ word })

      if (error) {
        throw error
      }

      res.status(200).json()
    } catch (error) {
      res.status(400).json({ error })
    }
  } else {
    res.status(500).json({
      error: `Cannot find any match endpoint with method ${req.method}`,
    })
  }
}
