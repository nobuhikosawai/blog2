import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import AutoImport from 'astro-auto-import';
import {
  astroCodeSnippets,
  codeSnippetAutoImport,
} from './src/integrations/astro-code-snippets';

export default defineConfig({
  site: 'https://nobuhikosawai.com/',
  integrations: [
    AutoImport({
      imports: [codeSnippetAutoImport],
    }),
    astroCodeSnippets(),
    sitemap(),
    tailwind(),
    mdx(),
  ],
});
