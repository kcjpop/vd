const request = require('supertest')
const app = require('../app')

describe('/summary', () => {
  it('should return counts for each dictionary', async () => {
    const res = await request(app).get('/summary')

    expect(res.body.EnVi).toBeGreaterThan(100)
    expect(res.body.Wordnet).toBeGreaterThan(100)
  })
})
