const request = require('supertest')
const app = require('../app')

describe('/banner/:word', () => {
  it('should return 200 for GET /banner/:word', () =>
    request(app)
      .get('/banner/hello')
      .then((response) => {
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toBe('image/png')
      }))

  it('should return 500 for GET /banner/:word for word that not exists', () =>
    request(app)
      .get('/banner/hsdf')
      .then((response) => {
        expect(response.statusCode).toBe(500)
      }))
})
