# Popular-recipes pipeline (parked)

Traffic-ranked "Popular" section for the homepage. First step already done: analytics is live (GoatCounter).

## State now

- Analytics: GoatCounter, panel at `https://2bytesgoat.goatcounter.com`, counted site: `bits.2bytesgoat.com`
- Config: `quartz.config.yaml` → `configuration.analytics` (`provider: goatcounter`, `websiteId: 2bytesgoat`)
- Counter script Quartz emits: `https://gc.zgo.at/count.js` with `data-goatcounter="https://2bytesgoat.goatcounter.com/count"` - tracks initial loads + SPA navigations, cookie-free
- Homepage has manual layout instead: "From the pot" (featured blurb, hand-written) + "Browse" (mood/appliance tag links)

## Step 1 - at 3+ recipes: auto-updating lists

Enable `@quartz-community/recent-notes` (currently `enabled: false`, `quartz.config.yaml:~221`). Options support `limit`, custom `sort` (by date), `filter`. homepage lists newest recipes automatically; keep the hand-written blurb as intro above it.

## Step 2 - when there's real traffic: rank by visits

GitHub Pages is static, so "popular" = computed at build time:

1. Create a GoatCounter **API key** with `stats` scope: panel → Settings → API (panel → https://2bytesgoat.goatcounter.com)
2. Store it as repo secret `GOATCOUNTER_API_KEY` (repo Settings → Secrets → Actions) - key must never be client-side
3. Add a step to `.github/workflows/deploy.yml` **before** `npx quartz build`:
   - `curl -H "Authorization: Bearer $GOATCOUNTER_API_KEY" "https://2bytesgoat.goatcounter.com/api/v0/stats/paths?start=...&limit=10&format=csv"` (stats API docs: https://www.goatcounter.com/help/api - endpoint `/api/v0/stats/paths` lists page paths by view count)
   - map paths → slugs, write result to `quartz/static/popular.json` (the `static/` dir is copied verbatim to the site root by the static emitter)
4. New tiny custom component (first one - `quartz/components/PopularRecipes.tsx`) + script: fetch `/popular.json`, reorder/render a "Popular" list on the homepage. Server-side falls back to manual order when the fetch fails
5. Homepage gains a `## Popular` section that fills client-side

## Ranking axes already in place

Mood/appliance tags (`tags/comfort`, `tags/slow-cooker` pages) - usable as deterministic "browse" fallback if API data is thin.
