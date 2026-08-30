---
title: bits/README — what this site is
description: For agents and Giani — what lives here, what doesn't.
draft: true
---

This is **bits** — Giani's side site on `bits.2bytesgoat.com`, separate repo (`2BytesGoat/bits`), deployed with Quartz v5 → GitHub Pages on push to `v5`.

## What lives here

- Food recipes, kitchen experiments
- Misc non-tech stuff that doesn't fit the main blog

## What doesn't

- Tech/course content → main blog (`2bytesgoat.github.io`, deployed to 2bytesgoat.com)
- Private stuff → diary repo, never here. This repo is **public on GitHub**, same rules as the main blog's routing rule in AGENTS.md

## Conventions

- Quartz v5 config: `quartz.config.yaml` (YAML now, not TS like the main v4 blog)
- `@quartz-community/cname` plugin emits `CNAME` from `baseUrl` at build — no static CNAME file
- Footer links: GitHub repo + main blog
- No analytics (`analytics: null`)
- Filenames Title Case, one canonical tag, deliberate `draft` flag (same as main blog)
- Voice: still read `meta/VOICE.md` / `meta/PERSONA.md` / `meta/FINGERPRINT.md` **from the main repo** before ghostwriting anything here

Sign-off applies here too: Peace 🐐