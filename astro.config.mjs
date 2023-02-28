import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import AutoImport from 'astro-auto-import';
import {
  astroCodeSnippets,
  codeSnippetAutoImport,
} from './src/integrations/astro-code-snippets';
import partytown from '@astrojs/partytown';

import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';

// https://astro.build/config
import image from '@astrojs/image';

// for oembedTransformer
function handleHTML(html, info) {
  const { url, transformer } = info;
  if (
    transformer.name === '@remark-embedder/transformer-oembed' ||
    url.includes('twitter.com')
  ) {
    return `<div style="max-width: max-content; margin-left: auto; margin-right: auto">${html}</div>`;
  }
  return html;
}

// https://astro.build/config
export default defineConfig({
  site: 'https://nobuhikosawai.com/',
  markdown: {
    remarkPlugins: [
      [
        remarkEmbedder,
        {
          transformers: [oembedTransformer],
          handleHTML,
        },
      ],
    ],
  },
  integrations: [
    AutoImport({
      imports: [codeSnippetAutoImport],
    }),
    astroCodeSnippets(),
    sitemap(),
    tailwind(),
    mdx(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
  ],
});
