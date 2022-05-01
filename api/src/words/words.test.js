const request = require('supertest')
const app = require('../app')

describe('/words/:word', () => {
  it('should return word entry', async () => {
    const r1 = await request(app).get('/words/duck')
    expect(r1.statusCode).toBe(200)

    const r2 = await request(app).get('/words/duck?dict=wordnet')
    expect(r2.statusCode).toBe(200)

    const r3 = await request(app).get('/words/duck?dict=en-vi')
    expect(r3.statusCode).toBe(200)
  })

  it('should return error if word is not found', async () => {
    const res = await request(app).get('/words/longmakeupwor1888181')

    expect(res.statusCode).toBe(404)
  })

  it('should return error if the `dict` is unsupported', async () => {
    const res = await request(app).get('/words/duck?dict=foo')

    expect(res.statusCode).toBe(400)
  })
})
