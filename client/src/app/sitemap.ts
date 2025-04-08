import { getBlogPosts } from '@/lib/api'
import { baseUrl } from '@/lib/constants'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();

  const blogPostUrls = posts.map(({ entryId }) => {
    return {
      url: `${baseUrl}/blog/${entryId}`
    }
  });

  return [

    {
      url: `${baseUrl}`,
    },
    {
      url: `${baseUrl}/about`,
    },
    {
      url: `${baseUrl}/pricing`,
    },
    {
      url: `${baseUrl}/blog`,
    },
    ...blogPostUrls,
  ]
}
