import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/app/*', '/discover/*'],
    },
    sitemap: 'https://finda.co/sitemap.xml',
  };
}
