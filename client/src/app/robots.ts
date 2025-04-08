import type { MetadataRoute } from 'next'

const env = process.env.ENVIRONMENT || 'dev';

export default function robots(): MetadataRoute.Robots {
  return env === 'prod'
    ? prodRobots()
    : devRobots();
}

function prodRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  }
}

function devRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
