import { environment } from '@/lib/constants';
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  console.log('Environment:', environment);

  return environment === 'prod'
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
