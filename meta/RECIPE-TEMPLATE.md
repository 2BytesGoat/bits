# Recipe template

Copy everything below the line into a new file, then fill the brackets.
Name the file kebab-case under an appliance/category subfolder
(`content/slow-cooker/chicken-noodle-soup.md`, not `Slow Cooker Chicken Noodle Soup.md`).

Before starting: pick from `thoughts/INBOX.md` (cravings/ideas live there). After publishing:
mark the INBOX entry composted and refresh the hand-curated queue on `content/index.md` if it changed.

## Fill-in template

---

````markdown
---
title: { Dish Name }
date: { YYYY-MM-DD }
draft: true
source: { url or omit }
tags:
  - recipe
  - { category: soup | stew | pasta | pizza | roast | dessert | bread | breakfast }
  - { pantry tags from the list below }
servings: { n }
active: { mm min / h h }
total: { mm min / h h }
---

<!-- ![[hero-image.jpg]] -->

```recipe-summary
yield: {n}+ servings · prep time: {active} · cook time: {total − active}
total time: {e.g. `7 hours 30 minutes`}
hydration: {only for dough-based recipes, e.g. `60% (600 g flour / 360 ml water, one mix = 4 balls)`}
```

## Ingredients

> [!abstract] Shopping List
> **{Group}**
>
> - [ ] {emoji} {amount unit + gram/ml where it matters, count where it doesn't}
>
> **{Group}**
>
> - [ ] {…}
> - [ ] (optional) {…}
>
> **End**
>
> - [ ] {…} (things added in the last stretch)

_Shopping list is buy/batch reality - the pack you'd actually grab
(`one 800 g can covers 4 pizzas`), not a scaled-down fantasy. Every line states
its coverage; per-serving shares live in the steps._

Depending on your mood you can also use:

- **{Name}**: {one-line delta from the base recipe}

## Preparation

### Step 1 - {Name}

<!-- ![[step-image.jpg]] ← image slots live under the step they show, Assets/ folder -->

1. {Terse step. One action per step.}
2. {…}

### Step 2 - {Name}

<!-- ![[step-image.jpg]] -->

3. {…} (keep numbering continuous across steps)
````

---

## Pantry tag vocabulary (keep it small, delete the tag when a recipe drops it)

- Protein: `chicken` `beef` `pork` `fish` `eggs` `legumes` `tofu`
- Carb: `pasta` `rice` `potato` `bread` `flour`
- Dairy: `dairy` (milk/cream/butter/cheese - one tag, don't split)
- Aromatics/veg: `allium` (onion/garlic/leek) `carrot` `celery` `tomato` `roots` `mushroom` `greens` `peppers`
- Pantry/liquid: `stock` `canned-tomato` `coconut-milk`
- Herb/spice ledger: `herbs` `spices` (NOT individual herb names; `herbs` = fresh herbs a recipe needs)
- Category (always exactly one): `soup` `stew` `pasta` `pizza` `roast` `dessert` `bread` `breakfast`
- Mood (max one, optional): `comfort` `fresh` `hearty`
- Appliance (only when defining): `slow-cooker` `oven` `stovetop`

## Conventions

- `recipe` tag always present, exactly one category tag
- Pantry tags = _required_ ingredients only - what you'd actually check the
  fridge/pantry for. Staples (oil, dried herbs/spices, stock, cornstarch,
  salt/pepper) and optional ingredients (cream, lemon garnish) stay untagged so
  they never count against a "fewest missing" match
- Weights in g/ml, temps in °C, oven fan assumed
- Shopping list = buy/batch sizes, never scaled-down portions: list what you'd
  actually mix or buy (one dough mix, one can), label each line/group with its
  coverage ("covers 4 pizzas"), and keep per-serving quantities in the steps
- Amounts that don't matter in grams stay countable ("3 cloves garlic" not "9 g garlic")
- Steps imperative, ≤2 clauses each, no "carefully"/"gently" filler
- Images: `![[Name.jpg]]` resolves from `content/assets/` - never move or delete that folder
- One canonical wikilink target per concept; page names kebab-case to match filenames
- Recipe summary goes in a `recipe-summary` fence right under the frontmatter -
  renders as a centered muted strip (yield · prep/cook · total time); no other
  code fences in recipes
- After publishing a recipe: mark `draft: false`, add it to `content/index.md`
- Shared components (doughs, sauce bases) get their own component page under a
  component subfolder (`content/dough/`), tags `recipe` + `component`, no
  category tag - the category rule applies to dishes only. Recipes pull them in
  with a `![[page]]` embed (page-in-page) and link the canonical target once.
  Component pages must stay `draft: false` - drafts don't render in transclusions
- To reuse a component's ingredient list without retyping it: put a `^name`
  marker on its own line right after the component's shopping-list callout
  (blank line between them), then embed it with `![[page#^name]]` in the
  consuming recipe. Builds stay in sync automatically - edit the component once
