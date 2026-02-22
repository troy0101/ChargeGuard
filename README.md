# ChargeGuard

ChargeGuard is a React + Vite app configured for GitHub Pages.

## Local development

1. Install dependencies:
	- `npm install`
2. Start dev server:
	- `npm run dev`

## Build

- `npm run build`

## GitHub Pages deployment

This repo includes a GitHub Actions workflow at [\.github/workflows/deploy.yml](.github/workflows/deploy.yml) that builds and deploys on every push to `main`.

After pushing:

1. Go to repository settings.
2. Open **Pages**.
3. Set **Source** to **GitHub Actions**.

Your site will be published automatically after the workflow succeeds.