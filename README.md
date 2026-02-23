# ChargeGuard

ChargeGuard is a React + Vite app configured for GitHub Pages.

## Local development

1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env`
   - Set `VITE_GOOGLE_MAPS_API_KEY`
   - Set `VITE_NREL_API_KEY` (you can use `DEMO_KEY` for testing)
3. Start dev server:
   - `npm run dev`

## Build

- `npm run build`

## NREL API calls

- `GET /api/alt-fuel-stations/v1.format?parameters`
- `GET /api/alt-fuel-stations/v1/nearest.format?parameters`

By default, requests are sent to `https://developer.nrel.gov`. Override this with `VITE_NREL_API_BASE_URL` if needed.

## GitHub Pages deployment

This repo includes a GitHub Actions workflow at [\.github/workflows/deploy.yml](.github/workflows/deploy.yml) that builds and deploys on every push to `main`.

After pushing:

1. Go to repository settings.
2. Open **Pages**.
3. Set **Source** to **GitHub Actions**.

Your site will be published automatically after the workflow succeeds.