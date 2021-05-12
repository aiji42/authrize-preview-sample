module.exports = {
  trailingSlash: true,
  rewrites: async () => {
    if (process.env.VERCEL_ENV !== 'preview') return {}
    return {
      beforeFiles: [
        {
          source: '/api/:path*/',
          destination: '/api/:path*',
        },
        {
          source: '/:path*/',
          has: [
            {
              type: 'cookie',
              key: 'x-custom-authorized',
              value: process.env.AUTH_KEY,
            },
          ],
          destination: '/:path*',
        },
        {
          source: '/:path*/',
          destination: '/challenge',
        }
      ]
    }
  }
}