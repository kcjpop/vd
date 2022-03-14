/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  headers: async () => {
    return [
      {
        source: '/api/v1/:word',
        headers: [{ key: 'Accept', value: 'application/json; charset=UTF-8' }],
      },
    ]
  },
}
