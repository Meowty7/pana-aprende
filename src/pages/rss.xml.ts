import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
    const blogs = await getCollection('categorias');
    const sortedPosts = blogs.sort(
        (a, b) => Number(new Date(b.data.date)) - Number(new Date(a.data.date))
    );
    return rss({
        title: 'Pana Aprende',
        description:
            'Proyecto Final Desarrollo de Software 5',
        site: context.site || 'https://pana-aprende.vercel.app',
        items: sortedPosts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: `/blog/${post.slug}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}