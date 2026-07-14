# Deploying the Astro (dynamic) site

This project renders on the server (`output: 'server'` + `@astrojs/node`), so
it needs a host that runs Node — **not** GitHub Pages, which only serves
static files and can't run the `/api/contact` endpoint or per-request
rendering.

Pick one of these:

## Option A — Render.com (simple, free tier available)
1. Push this project to a GitHub repo.
2. On Render: **New → Web Service**, connect the repo.
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`
5. Add environment variables (Render dashboard → Environment):
   `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
6. Once deployed, add `saanvi.n4ir.com` as a custom domain in Render's
   settings, then add the CNAME record it gives you to your DNS provider for
   `n4ir.com`.

## Option B — Railway.app
Same idea as Render: connect the repo, it detects Node automatically,
set the same environment variables, then attach the custom domain via
Railway's settings + a CNAME record at your DNS provider.

## Option C — A VPS you manage yourself
```bash
git clone <your-repo>
cd saanvi-astro
npm install
npm run build
# create a .env file with SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS
npm run start   # runs node ./dist/server/entry.mjs, serves on port 4321 by default
```
Put this behind a reverse proxy (nginx/Caddy) for HTTPS + the custom domain,
and use a process manager (pm2, systemd) to keep it running.

## Option D — Vercel / Netlify / Cloudflare Pages
These platforms also support Astro SSR, but each needs a *different* adapter
package instead of `@astrojs/node`:
- Vercel → `@astrojs/vercel`
- Netlify → `@astrojs/netlify`
- Cloudflare → `@astrojs/cloudflare`

Swap the adapter in `astro.config.mjs` (`npx astro add vercel`, for example,
does this automatically), then follow that platform's own "connect a Git
repo" flow. Environment variables are set in that platform's dashboard,
same idea as Option A.

## Custom domain (saanvi.n4ir.com)
Whichever host you pick, the pattern is the same:
1. Deploy first, confirm the auto-generated URL (e.g. `*.onrender.com`) works.
2. In the host's dashboard, add `saanvi.n4ir.com` as a custom domain — it'll
   give you a CNAME target.
3. In your DNS provider for `n4ir.com`, add a CNAME record: host `saanvi`,
   value = whatever the host gave you.
4. Wait for DNS to propagate (minutes to a few hours), then enable HTTPS if
   it isn't automatic.

## Updating the site later
```bash
git add .
git commit -m "describe what changed"
git push
```
Most Node hosts (Render, Railway, Vercel, Netlify, Cloudflare) auto-redeploy
on every push once connected. A self-managed VPS needs a manual
`git pull && npm install && npm run build` + restart.
