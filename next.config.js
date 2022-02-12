/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/trendTech.json',
        destination: '/api/trendTech',
        permanent: true,
      },
      {
        source: '/.netlify/functions/trendTech',
        destination: '/api/trendTech',
        permanent: true,
      },
      {
        source: '/trendIdea.json',
        destination: '/api/trendIdea',
        permanent: true, 
      },
      {
        source: '/.netlify/functions/trendIdea',
        destination: '/api/trendIdea',
        permanent: true,
      },
      {
        source: '/trendBook.json',
        destination: '/api/trendBook',
        permanent: true,
      },
      {
        source: '/.netlify/functions/trendBook',
        destination: '/api/trendBook',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
