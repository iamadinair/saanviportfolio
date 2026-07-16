# Saanvi — Portfolio Site (Astro, dynamic)

A server-rendered Astro app — not a static export. Pages and the contact
form's API endpoint run on the server, per request, via Node.

## Requirements
- Node.js **22.12+** (Astro 6 requirement)

## Run locally
```bash
npm install
npm run dev
```
Then open the URL printed in the terminal (usually `http://localhost:4321`).
Every request is handled live by the dev server — edit a file, save, and the
browser updates without a manual rebuild.

## Project structure
```
saanvi-astro/
├── astro.config.mjs        # output: 'server' + Cloudflare adapter (SSR)
├── wrangler.jsonc           # Cloudflare Pages Functions config
├── src/
│   ├── data/site.config.js # ← edit THIS for content changes
│   ├── layouts/
│   │   └── PortfolioLayout.astro   # head, meta/OG tags, fonts, scroll-reveal script
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Hero.astro
│   │   ├── PhotoSequence.astro     # full-bleed landscape photo(s) at the top
│   │   ├── PhotoCarousel.astro     # horizontal wheel-scrollable portrait photos
│   │   ├── Bio.astro               # stats/temperament woven into prose
│   │   ├── CompCard.astro          # only rendered when showCompCard: true
│   │   ├── ContactForm.astro       # posts to Web3Forms via fetch
│   │   └── Footer.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css      # same nude/Fraunces+Inter design as before
└── public/
    ├── images/              # gallery + hero photos
    ├── files/comp-card-placeholder.pdf
    ├── favicon.svg
    └── og-image-v1.png
```

## Editing content
Everything content-related lives in **`src/data/site.config.js`**:
- `profile` — name, age range, location, stats, temperament notes
- `gallery` — the array of photos; each entry with `orientation: 'landscape'`
  renders full-bleed at the top via `PhotoSequence.astro`, everything else
  renders in the horizontal carousel via `PhotoCarousel.astro`. Add, remove,
  or reorder entries, or set `placeholder: true` for a "coming soon" tile
- `contact` — Web3Forms access key + subject prefix (+ optional CC)
- `instagram` — the linked Instagram URL
- `showCompCard` / `compCardPdfPath` — comp card visibility + file location

## Contact form (Web3Forms)
The form submits in the background via `fetch()` straight to
[Web3Forms](https://web3forms.com) — no `mailto:` popup, no visitor email
client involved, and no server code of our own to maintain.

- The access key lives in `src/data/site.config.js` under `contact.web3formsAccessKey`.
- Where the email actually lands is controlled by whichever email address
  that access key was created with on web3forms.com — not in this codebase.
- CC: a `ccemail` field is sent with each submission, but this is a **Web3Forms
  PRO feature** — on the free plan it's very likely ignored. Check your
  Web3Forms dashboard; if unsupported on your plan, forward manually from the
  primary inbox instead.
- Free plan allows up to 250 submissions/month and stores submissions for 30
  days in their dashboard.

### Spam protection (hCaptcha)
The form includes Web3Forms' zero-config hCaptcha widget — no separate
hCaptcha account or site key needed, it's proxied through Web3Forms using
their shared free-plan key.

- The widget renders via the `.h-captcha` div in `ContactForm.astro` plus the
  `https://web3forms.com/client/script.js` script tag in `PortfolioLayout.astro`.
- Submission is blocked client-side with a "Please complete the captcha"
  message if it's not filled in, and the response token is sent along with
  the rest of the form data.
- **One manual step required**: log into your Web3Forms dashboard
  (app.web3forms.com), open this form, and enable **hCaptcha** as the active
  spam-block method. Without that toggle, the widget shows but Web3Forms
  won't actually enforce it server-side.
- hCaptcha's free checkbox can occasionally ask for an image challenge — this
  is normal hCaptcha behavior, not something this codebase controls.

## Adding photos
Drop the image into `public/images/`, then add an entry to the `gallery` array
in `src/data/site.config.js` — no HTML editing needed.

## Deployment
See `DEPLOY.md` — this project deploys to **Cloudflare Pages** (server-rendered
via `@astrojs/cloudflare`). GitHub Pages won't work since it only serves
static files.
