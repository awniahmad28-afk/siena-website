# SIENA — The Evolution of Business Systems

> **Launching?** Follow [LAUNCH.md](LAUNCH.md): domain, base path, location, social links, and the email (SPF / DKIM / DMARC) setup so replies don’t land in spam.

Official homepage for **SIENA Solutions**.
*One desk. One business. Centuries of evolution.*

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out  (deploy the folder to any CDN / Vercel / Netlify)
```

Requires Node 20+.

## Homepage

The homepage (`app/page.tsx`) is **Genesis Flux**: scrolling builds the SIENA symbol from a live particle network (move the cursor to disturb it, click to send a pulse), then the six solution modules orbit the official logo; selecting one runs its workflow.

| Part | File |
|---|---|
| Hero engine (particles, logo, orbiting modules) | `components/genesis/Genesis.tsx` |
| Solutions wheel (`#solution-<id>` opens a solution) | `components/flux/SolutionsTide.tsx` |
| Header (section tracking, mobile menu), header logo with pink tail | `components/flux/FluxHeader.tsx`, `TailSymbol.tsx` |
| About SIENA, then the Light Sweep logo interlude; Why SIENA (Without/With switch) | `components/flux/FluxWhat.tsx`, `LogoInterlude.tsx`, `FluxWhy.tsx` |
| Contact form (opens a pre-filled email), footer (Logo Reveal brand) | `components/flux/FluxContact.tsx`, `FluxFooter.tsx`, `FooterReveal.tsx` |
| Colours, fonts, layout | `app/home.module.css` |

All copy comes from `content/site.ts`.

"Experience the Evolution" (any `#evolution` link) opens the full-screen Evolution story on top of the homepage (`components/StoryLayer.tsx`); its ending shows the logo and the six services.  

## Our Work page (`/work`)

One tab per service. Pictures and videos come straight from folders, with no code to edit:

`public/work/apps/` · `websites/` · `agents/` · `automation/` · `systems/` · `marketing/`

Each **sub-folder is a project** (e.g. `public/work/websites/dolce-aesthetic-clinic/`): its first picture is the card cover, its first video plays on the card, and all its pictures and videos open in the project viewer. Give a project its title and description in `PROJECTS` in `content/work.ts` (keyed by folder name). Pictures or videos placed directly in a service folder appear as a simple gallery, in file-name order. The file name becomes the caption (`01-bloom-salon-website.jpg` → "Bloom salon website"). A video gets a cover picture from an image with the same name (`tour.mp4` + `tour.jpg`). Keep videos short and compressed (under ~20 MB). A tab with nothing in it shows "Projects coming soon." The page text is in `content/work.ts`.

## Where to edit

| What | File |
|---|---|
| Era copy, years, keywords, palettes, scroll length, thread colour | `content/eras.ts` |
| Hero, reveal lines, CTAs, solutions, contact email, domain | `content/site.ts` |
| Realistic era images (3D renders; replaceable by photos) | `art/plates/<id>.jpg` → `npm run plates` · list in `content/plates.ts` · renderer in `tools/render/` · photo prompts in `docs/PHOTO-PROMPTS.md` |
| Scene art for each era (layered SVG, used where no photo exists) | `components/scenes/*` |
| Which layers show in which era | `LAYERS` in `components/EvolutionScene.tsx` |
| Scroll choreography (generic rules + per-chapter extras) | `lib/choreography.ts` |
| The thread shapes and SIENA symbol trace | `lib/geometry.ts` |
| Design tokens and layout | `app/globals.css` |

**Before launch:** follow [LAUNCH.md](LAUNCH.md).

## Brand assets

`brand/SIENA logo - Solutions.png` is the single source of truth. `npm run assets` crops it, turns its dark background into transparency and writes AVIF/WebP files to `public/brand/`. The mark and wordmark are never redrawn. If you get a vector or transparent master, replace the file and run the script again.

## Modes

- **Cinematic** (≥ 900 px wide, motion allowed): a sticky stage with one scroll-scrubbed GSAP timeline.
- **Chronicle** (mobile, portrait tablet, `prefers-reduced-motion`, or no JavaScript): the same eras as a linear story with static vignettes.

`docs/ARCHITECTURE.md` is the original v1 plan, kept for reference; the sections above describe the site as it is now.
