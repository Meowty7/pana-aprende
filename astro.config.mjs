import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import theme from './dark-theme.json';
import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
const prettyCodeOptions = {
  theme,
  onVisitHighlightedLine(node) {
    node?.properties?.className?.push('highlight-line');
  },
  onVisitHighlightedChars(node) {
    node?.properties?.className ? node.properties.className.push('highlighted-chars') : node.properties.className = ['highlighted-chars'];
  },
  tokensMap: {}
};


// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), react(), mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    extendDefaultPlugins: true,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions], rehypeSlug, [rehypeAutolinkHeadings, {
      properties: {
        className: ['anchor']
      }
    }]],
    shikiConfig: {
      theme
    }
  },
  adapter: vercel()
});