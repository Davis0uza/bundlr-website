import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            crawlDelay: 20,
        },
        sitemap: 'https://bundlr.pt/sitemap.xml',
    }
}
