const request = require('supertest')
const app = require('../app')

describe('/dict/:name', () => {
  it('should fail if missing `limit` or `offset`', async () => {
    await request(app)
      .get('/dict/en-vi')
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })

    await request(app)
      .get('/dict/en-vi?offset=0')
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })

    await request(app)
      .get('/dict/en-vi?limit=200')
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })
  })

  it('should fail if "limit" is not between 100 and 1000', async () => {
    await request(app)
      .get('/dict/en-vi?offset=0&limit=10')
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })

    await request(app)
      .get('/dict/en-vi?offset=0&limit=1200')
      .then((res) => {
        expect(res.statusCode).toBe(400)
      })
  })

  it('should return words of a dict', async () => {
    const res = await request(app).get('/dict/en-vi?offset=0&limit=100')

    expect(res.statusCode).toBe(200)
    expect(res.body.words.length).toBe(100)
  })
})
