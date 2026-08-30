# Recipe template

Copy everything below the line into a new file, then fill the brackets.
Name the file in Title Case (`Slow Cooker Chicken Noodle Soup.md`, not `slow-cooker-chicken-noodle-soup.md`).

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
  - { category: soup | stew | pasta | roast | dessert | bread | breakfast }
  - { pantry tags from the list below }
servings: { n }
active: { mm min / h h }
total: { mm min / h h }
---

> [!tip] Ingredients — metric
> {One line per group. Amounts unit + gram/ml where it matters, count where it doesn't.}
> **Base:** {…}
> **End:** {…} (things added in the last stretch)
> **Finish:** {…} (herbs, acid, garnish)

```recipe-summary
yield: {n} servings · prep time: {active} · cook time: {total − active}
total time: {total}
```

> [!warning] Gotcha
> {The one thing most likely to ruin this dish. Omit only if truly foolproof.}

## Prep

1. {Terse step. One action per step.}
2. {…}
   <!-- ![[step-image.jpg]] ← image slots live under the step they show, Assets/ folder -->

## Variants

- **{Name}**: {one-line delta from the base recipe}
````

---

## Pantry tag vocabulary (keep it small, delete the tag when a recipe drops it)

- Protein: `chicken` `beef` `pork` `fish` `eggs` `legumes` `tofu`
- Carb: `pasta` `rice` `potato` `bread` `flour`
- Dairy: `dairy` (milk/cream/butter/cheese — one tag, don't split)
- Aromatics/veg: `allium` (onion/garlic/leek) `carrot` `celery` `tomato` `roots` `mushroom` `greens` `peppers`
- Pantry/liquid: `stock` `canned-tomato` `coconut-milk`
- Herb/spice ledger: `herbs` `spices` (NOT individual herb names; `herbs` = fresh herbs a recipe needs)
- Category (always exactly one): `soup` `stew` `pasta` `roast` `dessert` `bread` `breakfast`
- Mood (max one, optional): `comfort` `fresh` `hearty`
- Appliance (only when defining): `slow-cooker` `oven` `stovetop`

## Conventions

- `recipe` tag always present, exactly one category tag
- Pantry tags = _required_ ingredients only — what you'd actually check the
  fridge/pantry for. Staples (oil, dried herbs/spices, stock, cornstarch,
  salt/pepper) and optional ingredients (cream, lemon garnish) stay untagged so
  they never count against a "fewest missing" match
- Weights in g/ml, temps in °C, oven fan assumed
- Amounts that don't matter in grams stay countable ("3 cloves garlic" not "9 g garlic")
- Steps imperative, ≤2 clauses each, no "carefully"/"gently" filler
- Images: `![[Name.jpg]]` resolves from `content/Assets/` — never move or delete that folder
- One canonical wikilink target per concept, Title Case
- Recipe summary goes in a `recipe-summary` fence right under the frontmatter —
  renders as a centered muted strip (yield · prep/cook · total time); no other
  code fences in recipes
- After publishing a recipe: mark `draft: false`, add it to `content/index.md`
