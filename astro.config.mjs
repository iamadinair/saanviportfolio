import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Server output = pages render on request, not just once at build time —
// that's what makes the site genuinely dynamic. The Cloudflare adapter runs
// this as Pages Functions (Workers runtime), not a persistent Node process.
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
});