import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// Server output = pages (and the /api/contact route) render on request,
// not just once at build time. That's what makes `npm run dev` and the
// deployed site genuinely dynamic rather than a pre-built static export.
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
});
