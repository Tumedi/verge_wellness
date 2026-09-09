# Verge Wellness

A component-based **React + Vite** e-commerce front-end for **Verge Wellness**
(Organic · Natural · Holistic). Six pages — Home, Shop, About Us, Our Benefits,
Blog, Contact — with a shared layout, client-side routing, a cart counter, and a
botanical design system.

![Organic · Natural · Holistic](public/leaf.svg)

## Tech stack

- **React 18** + **React Router 6** (client-side routing)
- **Vite 5** (dev server + build)
- Plain CSS design system in `src/index.css` (no UI framework)
- Cart state via React Context + `localStorage`

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  main.jsx              # entry; Router + StoreProvider
  App.jsx               # routes
  index.css             # design system + page styles
  data/content.js       # products, blog posts, nav, categories (edit content here)
  components/
    Layout.jsx          # Navbar + <Outlet/> + Footer, scroll-to-top
    Navbar.jsx  Footer.jsx
    ProductCard.jsx  BlogCard.jsx  Feature.jsx  Stars.jsx
    Photo.jsx           # image-or-placeholder media block
    Icons.jsx           # inline SVG icon set
    StoreContext.jsx    # cart + toast state
  pages/
    Home.jsx  Shop.jsx  About.jsx  Benefits.jsx  Blog.jsx  Contact.jsx
```

## Adding real product / lifestyle images

Every media block falls back to a themed gradient + leaf watermark until you
supply a real image. To add one:

1. Put the file in `public/images/` (e.g. `public/images/moringa-powder.jpg`).
2. Reference it in `src/data/content.js` via the optional `image` field:

   ```js
   {
     name: 'Moringa Leaf Powder',
     price: 149, rating: 5, reviews: 24,
     media: 'photo--powder',           // gradient fallback
     image: '/images/moringa-powder.jpg',
   }
   ```

   Use a **root-relative** path (`/images/...`). Vite rewrites it for the
   configured `base` at build time, so it works locally and on GitHub Pages.

   Alternatively, import from `src/assets/` for hashed/optimized assets:

   ```js
   import moringa from '../assets/moringa-powder.jpg'
   // ...then set image: moringa in the data object (co-locate the import).
   ```

The same `image` field works for `PRODUCTS`, `CATEGORIES`, `POSTS`, and
`INGREDIENTS`. Hero images can be added by passing `src=` to the `<Photo>`
components inside each page.

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds and deploys on every push to
`main`. It sets Vite's `base` from the repository name automatically and adds a
`404.html` SPA fallback so deep links work.

To enable it: in the GitHub repo, go to **Settings → Pages → Build and
deployment → Source: GitHub Actions**. The site publishes to
`https://<user>.github.io/<repo>/` — for this repo, that's
`https://Tumedi.github.io/verge_wellness/`.

Running locally the app uses `base: '/'`; the production build uses
`/<repo>/` (override with the `VITE_BASE` env var if needed).
