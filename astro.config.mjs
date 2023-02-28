import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import AutoImport from 'astro-auto-import';
import { astroCodeSnippets, codeSnippetAutoImport } from './src/integrations/astro-code-snippets';
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: 'https://nobuhikosawai.com/',
  integrations: [AutoImport({
    imports: [codeSnippetAutoImport]
  }), astroCodeSnippets(), sitemap(), tailwind(), mdx(), partytown({
    config: { 
      forward: ["dataLayer.push"] 
    },
    })]
});
