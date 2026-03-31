// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://highcroftdigital.com',
  integrations: [sitemap()],
});
