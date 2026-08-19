# RTC Luxury — Website

The private, high-end brand from Resort Travel Club. Built with the same stack as
[rtcgetaways.com](https://rtcgetaways.com/): **React 18 + Vite**, styled with **Tailwind CSS**,
routed with **React Router**.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Outputs a static `dist/` folder ready to deploy anywhere that serves static files
(Cloudflare Pages, Netlify, Vercel, S3 + CDN, etc.).

## Deploying to GitHub Pages (this repo is already set up for it)

This project ships with `.github/workflows/deploy.yml`, which builds the site with Vite
and publishes `dist/` to GitHub Pages automatically on every push to `main`.

One-time setup after the first push:

1. In the repo on GitHub, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions** (not "Deploy from a
   branch").
3. Push to `main` (or re-run the "Deploy to GitHub Pages" workflow from the **Actions** tab).
   The site will be live at `https://telecomelite-inc.github.io/rtcluxury/` once the
   workflow finishes.
4. Still under **Settings → Pages → Custom domain**, enter `RTCLuxury.com` and save.
   GitHub will verify the DNS records below and issue an HTTPS certificate automatically
   (this can take a few minutes to a few hours).

### DNS records to add in Cloudflare

Since Cloudflare is handling DNS for `RTCLuxury.com`, add these records (**Proxy status:
DNS only / grey cloud**, not proxied — GitHub Pages serves its own TLS cert, and a
proxied/orange-cloud record can interfere with domain verification):

| Type | Name | Content |
|---|---|---|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |
| CNAME | www | `telecomelite-inc.github.io` |

A `public/CNAME` file containing `RTCLuxury.com` is already included in this repo, which is
what tells GitHub Pages to serve the custom domain.

### Note on client-side routing

GitHub Pages has no server-side routing, so this project includes the standard
[spa-github-pages](https://github.com/rafgraph/spa-github-pages) redirect trick
(`public/404.html` + a small script in `index.html`) so that direct links and refreshes on
routes like `/properties` work correctly instead of showing a 404.

### Alternative: Cloudflare Pages

If you'd rather host on Cloudflare Pages instead of GitHub Pages, that also works —
**Workers & Pages → Create → Pages → Connect to Git**, framework preset **Vite**, build
command `npm run build`, output directory `dist`. You can remove `public/CNAME` and the
`.github/workflows/deploy.yml` file in that case, since Cloudflare Pages handles the
domain and builds itself.

## Project structure

```
src/
  components/   Reusable UI (Navbar, Footer, Hero, ListingCard, ...)
  pages/        Route-level pages (Home, Properties, About, Contact, Journal)
  data/         Placeholder listings + journal content — replace with real data
  assets/       Logo SVGs
public/         Favicons, static files served as-is
```

## Replacing placeholder content

- **Listings:** edit `src/data/listings.js`. Each listing has an `image` URL (currently
  pointing at free Unsplash stock photos as stand-ins) — swap in real photography and
  copy once available.
- **Journal articles:** `src/data/journal.js`.
- **Contact details / concierge email & phone:** `src/pages/Contact.jsx`.
- **Brand colors:** `tailwind.config.js` (`emerald` and `gold` palettes).

## Brand assets

See the sibling `branding/` folder (delivered alongside this project) for the RTC Luxury
logo in SVG (light/dark lockups + standalone icon) and PNG/favicon exports.

## Notes

- The contact form is a front-end-only demo (no email is actually sent). Wire it up to
  your email/CRM provider of choice (e.g. Formspree, a Cloudflare Worker, HubSpot) before
  going live.
- The "Member Login" button and search bar are visual/UI only for now — no backend is
  connected. Let RTC Luxury's dev team know if you'd like a real search/auth backend
  scoped next.
