import image from '@astrojs/image' // https://astro.build/config
import mdx from '@astrojs/mdx'
import preact from '@astrojs/preact'
import vercel from '@astrojs/vercel/edge'
import { defineConfig } from 'astro/config'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkToc from 'remark-toc'
import { remarkReadingTime } from './src/lib/remark-reading-time.mjs'

const prettyCodeOptions = {
  theme: 'one-dark-pro',
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: 'text',
          value: ' ',
        },
      ]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },
  tokensMap: {},
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact(),
    image(),
    mdx({
      syntaxHighlight: false,
      extendDefaultPlugins: true,
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      remarkPlugins: [remarkToc, remarkReadingTime],
      remarkRehype: {
        footnoteLabel: 'Footnotes',
      },
      gfm: false,
    }),
  ],
  output: 'server',
  adapter: vercel(),
})
