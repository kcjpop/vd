const request = require('supertest')
const app = require('../app')

describe('/suggestions', () => {
  it('should return suggestions for a keyword', async () => {
    const res = await request(app).get('/suggestions/go')

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('should limit number of suggestions', async () => {
    const res = await request(app).get('/suggestions/go?limit=3')

    expect(res.statusCode).toBe(200)
    expect(res.body.length).toBe(3)
  })

  it('should limit number of suggestions', async () => {
    const r1 = await request(app).get('/suggestions/go?limit=0')
    expect(r1.statusCode).toBe(400)

    const r2 = await request(app).get('/suggestions/go?limit=51')
    expect(r2.statusCode).toBe(400)
  })
})
