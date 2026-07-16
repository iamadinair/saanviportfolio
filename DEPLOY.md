# Deploying to Cloudflare Pages

This project renders on the server (`output: 'server'` + `@astrojs/cloudflare`),
running as Cloudflare Pages Functions on the Workers runtime.

## Cloudflare Pages dashboard settings
When connecting the repo (Workers & Pages → Create → Pages → Connect to Git):
- **Production branch**: whichever branch you actually push to (commonly `main`)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: leave blank unless this project lives in a subfolder of the repo

No environment variables are needed — the contact form posts straight to
Web3Forms from the browser, so there's no server secret to configure here.

## Custom domain (saanvi.n4ir.com)
1. Deploy once first and confirm the auto-generated `*.pages.dev` URL works.
2. In the Pages project → **Custom domains**, add `saanvi.n4ir.com`.
3. Since `n4ir.com` is already on Cloudflare, this is usually a one-click
   "Activate domain" rather than a manual DNS record — Cloudflare adds the
   CNAME for you automatically when the domain's on the same account.

## Updating the site
```bash
git add .
git commit -m "describe what changed"
git push
```
This should trigger an automatic build in Cloudflare Pages. If it doesn't,
see the checklist below.

## Git push not triggering a build — checklist
Work through these in order; one of the first few almost always explains it:

1. **Direct Upload vs Git integration.** If this Pages project was originally
   created via "Upload assets" instead of "Connect to Git," it will *never*
   auto-build on push — that's a different deployment mode entirely, and you
   can't switch a Direct Upload project to Git integration after the fact.
   Check **Settings → Builds & deployments** for which mode it's in; if it's
   Direct Upload, you'd need to create a new Pages project connected via Git.
2. **Branch control.** Project → **Settings → Builds → Branch control** —
   confirm "Enable automatic production branch deployments" is **on**, and
   that you're pushing to the exact branch set as the Production branch.
3. **Repo permissions.** The Cloudflare GitHub App needs at least *Maintainer*
   access on the repo to receive webhook events — Contributor-level access
   silently won't trigger anything.
4. **Suspended installation.** Check `github.com/settings/installations` (or
   your org's equivalent) for the "Cloudflare Workers & Pages" app. If it
   shows suspended, there's an "Unsuspend" button at the bottom of its
   settings page.
5. **Reinstall the Git integration.** Settings → Builds & deployments → Git
   integration → disconnect, then reconnect the repo. This resolves most
   silent webhook failures that aren't explained by 1–4.
6. **Check Cloudflare's status page** (cloudflarestatus.com) for ongoing
   incidents affecting Pages builds/webhook delivery — these happen
   occasionally platform-wide and aren't a config problem on your end.

## Local preview with Wrangler
`npm run dev` (the Astro dev server) is fine for everyday editing. To test
against the actual Workers runtime before pushing:
```bash
npm run build
npm run preview   # runs: wrangler pages dev ./dist
```

## Alternative hosts
If you ever move off Cloudflare, this project needs *a* server-capable host
either way — the adapter would need to change again:
- **Render / Railway**: swap back to `@astrojs/node` (`npm install @astrojs/node`,
  update `astro.config.mjs`), build command `npm install && npm run build`,
  start command `node ./dist/server/entry.mjs`.
- **Vercel**: `@astrojs/vercel` (`npx astro add vercel` does this automatically).
- **Netlify**: `@astrojs/netlify` (`npx astro add netlify`).
- **A VPS**: same as Render's Node setup, behind nginx/Caddy for HTTPS, kept
  alive with pm2 or systemd.

GitHub Pages still won't work for any SSR variant of this project — it only
serves static files.
