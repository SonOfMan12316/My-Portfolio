# Portfolio Redesign — lucaslima.design Clone

**Reference:** https://www.lucaslima.design/
**Goal:** Replicate the reference system exactly (type, tokens, layout, motion), then tweak content afterward.
**Status legend:** `[ ]` todo · `[x]` done · `[~]` in progress · `[!]` blocked

---

## 0. Extracted Spec (reference — do not edit)

### 0.1 Fonts (verified via computed styles, NOT the stylesheet's lying `--brand-font`)
| Role | Family | Weights | Source |
|---|---|---|---|
| Display / headings / nav / rows | **General Sans** | 400, 500, 600, 700 | Fontshare (free) — self-host woff2 |
| Body / UI / prose | **Inter Variable** | 100–900 | next/font or self-host |
| Mono (accents, labels) | **Geist Mono** | 400 | OFL |

Reference self-hosts at `/fonts/general-sans-{400,500,600}.woff2`, `/fonts/geist-mono-400.woff2`.

### 0.2 Color tokens
```
--st-paper : #f4f4f2    /* page background          */
--st-k     : #121211    /* ink (true black-brown)   */
--st-m     : #6d6c66    /* muted text               */
--st-rule  : #d6d5cf    /* hairline divider         */
           : #e2e1dc    /* lighter rule (expertise) */
           : #a9a8a1    /* muted-on-dark (row hover)*/
```
Dot grid: `radial-gradient(circle, #32323259 1px, transparent 1.2px)` on a pseudo-element.

### 0.3 Easing + timing tokens
```
--st-e      : cubic-bezier(.23, 1, .32, 1)    /* standard  */
--st-ez     : cubic-bezier(.19, 1, .22, 1)    /* expressive */
--st-gutter : 16px (mobile) / 32px (desktop)
--st-t0     : 0s | .15s | .45s | 1.6s | 2.25s  (intro phase offsets)
--st-h0     : 0s | .25s                        (subpage hero offset)
--st-hero   : min(1320px, 100cqw - 2 * var(--st-gutter))
```

### 0.4 Type scale
| Element | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Hero `.st-big` | `clamp(34px, calc((100vw - 2*var(--st-gutter)) * .0743), 260px)` | 500 | `-.045em` | `.9` |
| Section head `.st-sec b` | `clamp(28px, 3vw, 44px)` | 500 | `-.035em` | `.95` |
| Section label `.st-sec` | `14px` uppercase | 500 | `0` | `1.45` |
| Tile name | `clamp(26px, 2.4vw, 36px)` | 400 | `-.035em` | `1` |
| Tile desc | `14px` | 400 | — | `1.3` |
| Tile foot/CTA | `13px` uppercase | 500 | `.01em` | `18px` |
| Row title `.st-row-t` | `24px` | 500 | `-.025em` | — |
| Row CTA `.st-row-v` | `13px` uppercase | 500 | — | — |
| Expertise | `15px` | 500 | — | `1.35` |
| Nav pill | `17px` | 500 | `-.01em` | — |
| Footer mark `.st-mark` | `21.93cqw` | 500 | `-.06em` | `.8` |

### 0.5 Keyframes
```
st-in   { to   { opacity:1; filter:none; transform:none } }
st-o    { 0%   { opacity:0 } }
st-y    { 0%   { transform:translateY(18px) } }
st-s    { 0%   { transform:scale(.97) } }
st-fade { to   { opacity:1 } }
st-flick{ 0%{opacity:0} 40%{opacity:.25} 60%{opacity:.1} to{opacity:1} }
```

### 0.6 Hero reveal mechanism
- Markup: `h1.st-big > span.st-wd > span.st-ws > span.st-wi` (one per word), `aria-label` on h1, `aria-hidden` on spans.
- `.st-ws` has `clip-path: inset(-.1em -.3em 0)` = the mask.
- `.st-wi` starts at `translateY(102%)`, slides to 0.
- Phase machine on `.st-home[data-phase]`: `idle → go → run → done`. At `done`, `.st-ws` gets `clip-path:none`.
- `:root[data-js]` gates all of it (no-JS = static). `[data-js=live]` triggers.
- `:root[data-intro=play]` raises `--st-t0` to 1.6s/2.25s for first-visit long intro.

### 0.7 Scroll reveal mechanism
```
:root[data-js] .st-io      { opacity:0; transform:translateY(24px) scale(.985);
                             transition: opacity .9s var(--st-ez), transform 1.1s var(--st-ez);
                             transition-delay: calc(var(--i,0) * 90ms) }
:root[data-js] .st-io.in   { opacity:1; transform:none }
```
IntersectionObserver adds `.in`. `--i` index drives the 90ms stagger.

### 0.8 Word-level lede reveal
```
:root[data-js] .st-w { opacity:0; filter:blur(4px); transform:translateY(.12em) }
.st-home:not([data-phase=idle]) .st-w {
  animation: st-in 1s var(--st-ez) both;
  animation-delay: calc(var(--st-t0) + .3s + var(--i) * 35ms) }
```

### 0.9 Hover states
| Target | Effect |
|---|---|
| `.st-pill:hover` | bg `#d6d6d1cc`, padding `0 22px` (width grows), `.2s var(--st-e)` |
| `.st-pill[aria-current]` | bg `#121211e6`, color paper |
| `.st-tile:hover .st-tile-name` | `translateX(6px)` `.3s var(--st-e)` |
| `.st-tile:hover .st-tile-cta i` | `translate(3px,-3px)` |
| `.st-grid:has(.st-tile:hover)` siblings | `filter: saturate(.3) opacity(.7)` |
| `.st-row:hover` | `::before` `scaleY(0)→1` ink wipe from bottom; text → paper |
| `.st-row:hover .st-row-t` | `translateX(8px)` |
| `.st-row:hover .st-row-v i` | `translateX(4px)` |
| `.st-footer a:hover` | color → ink, `.4s ease-out` |

### 0.10 Footer wordmark
- Per-character `<span>`, `overflow:hidden` parent.
- Each span `translateY(100%)` → `none`, `transition: transform 1.1s var(--st-ez)`, delay `calc(var(--i) * 40ms)`.
- `.in` class added on intersect.

### 0.11 Work grid placement map (12-col, `--st-grid`)
```
cols: repeat(12, 1fr); column-gap: 32px; margin-top: 8vh
```
| # | Tile | `--gc` | `--gr` | `--mt` | side | wide | aspect |
|---|---|---|---|---|---|---|---|
| 1 | Design System | `1/5`  | 1 | `0`    | l | no  | `4/5`   |
| 2 | Sciene        | `6/13` | 1 | `16vh` | r | yes | `16/10` |
| 3 | Traktive      | `1/8`  | 2 | `10vh` | l | yes | `2/1`   |
| 4 | Miinto        | `9/13` | 2 | `26vh` | r | no  | `4/5`   |
| 5 | Quartile      | `6/13` | 3 | `12vh` | r | yes | `2/1`   |
| 6 | CodeRabbit    | `1/5`  | 3 | `30vh` | l | no  | `4/5`   |
| 7 | Toymania      | `2/9`  | 4 | `10vh` | l | yes | `16/9`  |

Offsets: `[data-side=l]:not([data-wide]) { margin-right:14% }`, `[data-side=r]:not([data-wide]) { margin-left:10% }`
Cover: `border-radius:16px`, `aspect-ratio: var(--ar)`.

### 0.12 Numbered row grid
`grid-template-columns: 60px 1fr 1fr 80px; gap:20px; padding:20px 0; border-bottom:1px solid var(--st-rule)`
Columns: `01` / title / description / `VISIT →`. Description hidden on mobile.

### 0.13 Section header
`.st-sec` — flex, space-between, align-end, `border-bottom:1px solid var(--st-rule)`, `padding-bottom:14px`, `margin:18vh var(--st-gutter) 0`, `scroll-margin-top:112px`. Big label (`<b>`) left, small uppercase caption right.

---

## 1. Foundation

- [x] 1.1 Download General Sans 400/500/600/700 woff2 from Fontshare → `public/fonts/`
- [x] 1.2 Download Geist Mono 400 woff2 → `public/fonts/`
- [x] 1.3 Add `@font-face` declarations with `font-display:swap` in `globals.css`
- [x] 1.4 Keep Inter via `next/font` (already present); remove `Playfair_Display` from `layout.tsx`
- [x] 1.5 Wire `--font-general-sans`, `--font-geist-mono` CSS vars
- [x] 1.6 Replace palette in `globals.css` with `--st-*` tokens (§0.2)
- [x] 1.7 Add easing/timing tokens (§0.3)
- [x] 1.8 Add `--st-gutter` responsive (16px → 32px @ 1000px)
- [x] 1.9 Set `body` bg `--st-paper`, color `--st-k`, font Inter
- [x] 1.10 Add dot-grid background layer (fixed pseudo-element, §0.2)
- [x] 1.11 Add `scrollbar-gutter: stable` on `html`
- [x] 1.12 Add `:root[data-js]` / `[data-js=live]` bootstrap script in `layout.tsx` (inline, pre-paint)
- [x] 1.13 Port `st-*` keyframes into `globals.css` (§0.5)
- [x] 1.14 Update `prefers-reduced-motion` block to neutralize all `st-*` animations
- [ ] 1.15 Remove old keyframes/utilities no longer used (`float-gentle`, `line-grow`, etc.) — **deferred to end of Phase 8**; 19 components still reference them
- [x] 1.16 Update `::selection` to ink-on-paper

## 2. Shared primitives

- [x] 2.1 `<Reveal>` component — wraps children, adds `.st-io`, sets `--i`, IntersectionObserver adds `.in`
- [x] 2.2 `useIntersect` hook (once:true, rootMargin tuned)
- [x] 2.3 `<SplitWords>` — splits text into `.st-w` spans with `--i`
- [x] 2.4 `<SplitChars>` — splits into `.st-ch` spans with `--d` delay
- [x] 2.5 `<MaskWords>` — `.st-wd > .st-ws > .st-wi` hero markup + `aria-label`
- [x] 2.6 `<SectionHeader>` — rewrite to `.st-sec` spec (§0.13)
- [x] 2.7 `<NumberedRow>` — `.st-row` grid + ink-wipe hover (§0.12, §0.9)
- [x] 2.8 `<Pill>` — `.st-pill` nav pill with grow-on-hover (§0.9)

## 3. Header / nav

- [x] 3.1 Rewrite `Header.tsx` → fixed pill bar, `backdrop-filter: blur(14px) saturate(1.4)`
- [x] 3.2 Pills: name + section links, `height:44px`, `radius:99px`, bg `#e4e4e09e`
- [x] 3.3 `aria-current` active state (ink bg, paper text) driven by scroll-spy
- [x] 3.4 Right side: status chip (`● Available for work`) — green dot
- [x] 3.5 `.st-hr` entrance animation (fade + `translateY(-8px)`, 60ms stagger)
- [x] 3.6 Horizontal scroll + hidden scrollbar on mobile
- [x] 3.7 Reconcile with existing `NavigationTabs.tsx` / `ScrollSpy.tsx` (merge or retire)

## 4. Hero (`CoverSection`)

- [x] 4.1 Rebuild as `.st-home` with `data-phase` state machine (`idle→go→run→done`)
- [x] 4.2 Full-bleed justified wordmark via `<MaskWords>` — `display:flex; justify-content:space-between`
- [x] 4.3 Hero copy: decide the 3-word line (e.g. `FULL STACK ENGINEER`) — needs 3 words to match the layout
- [x] 4.4 Meta row: email (left, click-to-copy w/ "Copied" feedback) + role caption (right, uppercase 2 lines)
- [x] 4.5 Lede paragraph via `<SplitWords>` — muted `--st-m`, key words in `--st-k`
- [x] 4.6 Expertise micro-table — 2-col grid, `border-bottom:1px solid #e2e1dc`, `15px/500`
- [x] 4.7 `padding-top: 20vh` on the wordmark
- [x] 4.8 First-visit long intro via `sessionStorage` → `data-intro=play`
- [x] 4.9 Retire `InitialLoadScreen.tsx` (the phase machine replaces it)

## 5. Selected Work

- [x] 5.1 Rewrite `ProjectsSection` → `.st-grid` 12-col asymmetric layout
- [x] 5.2 Placement map generalised to a repeating 4-row rhythm in `src/utils/workGrid.ts` — handles any project count
- [x] 5.3 `<ProjectTile>`: head (name + desc) / cover / foot (category + `VIEW ↗`)
- [x] 5.4 Cover: `border-radius:16px`, `aspect-ratio:var(--ar)`, `overflow:hidden`, tinted surface
- [x] 5.5 Hover: name `translateX(6px)`, arrow `translate(3px,-3px)`
- [x] 5.6 Sibling desaturation via `:has()` (§0.9)
- [x] 5.7 Per-tile `--gc/--gr/--mt/--ar/data-side/data-wide` wired from data
- [x] 5.8 **Engineer variant:** dual `Live ↗` / `Code ↗` in tile foot + stack line
- [x] 5.9 Extend `ProjectInterface` with grid-placement fields
- [x] 5.10 Mobile: collapse to single column, reset all offsets
- [x] 5.11 Reconcile `SelectedWorksSection` / `ProjectsWorkSection` / `ProjectsPreview` (retire duplicates)

## 6. Numbered-row sections

- [x] 6.1 Rewrite `OpenSourceSection` → "Things I make on the side" numbered rows
- [x] 6.2 Rewrite `BlogSection` → "Writing" numbered rows
- [x] 6.3 `MobileAppsSection` retired — mobile apps now carry a `Mobile` category inside Work
- [x] 6.4 Ink-wipe hover on every row (§0.9)
- [x] 6.5 `01/02/03` zero-padded index in `--st-m`
- [x] 6.6 Hide description column under 1000px

## 7. Experience / About / Contact

- [x] 7.1 Rewrite `ExperiencesSection` → hairline rows matching row grammar
- [x] 7.2 `AboutSection` retired — its prose folds into the hero lede
- [x] 7.3 Rewrite `ContactSection` → drop dark block, use paper + big mark
- [x] 7.4 Retire `CapabilitiesSection` (expertise table in hero covers it)
- [x] 7.5 Audit `CertificationSection`, `ProofSection`, `PressSection` — keep or retire

## 8. Footer

- [x] 8.1 Rewrite `Footer.tsx` → `.st-footer-row` (links left, email right) on `border-top`
- [x] 8.2 Giant `.st-mark` wordmark — per-char spans, `21.93cqw`, bleeds both edges
- [x] 8.3 Staggered char rise on intersect (40ms, §0.10)
- [x] 8.4 `container-type: inline-size` on `.st-footer` for `cqw` sizing
- [x] 8.5 Retire `BackToTopButton` / `ScrollProgress` / `CustomCursor` (not in reference)

## 9. Polish & QA

- [x] 9.1 Apply `<Reveal>` to every section with correct `--i` ordering
- [x] 9.2 `:focus-visible` — `2px solid` accent, `outline-offset:5px`
- [x] 9.3 Skip link (`.skip-link`, slides in on focus)
- [~] 9.4 Reduced-motion block verified present and parsed via CSSOM; not yet exercised with the OS setting on
- [~] 9.5 Responsive sweep — **1440 verified in browser**; all `<1000px` media blocks confirmed parsed, but the window would not resize (OS-maximized) so narrow widths are **not visually verified**
- [x] 9.6 Hero wordmark fits 1444px in a 1448px slot at 1440 — no overflow, no wrap
- [x] 9.7 `npm run build` clean
- [x] 9.8 `npm run lint` clean
- [x] 9.9 Screenshot comparison vs reference at 1440 — hero, section header, tiles, rows all match
- [x] 9.10 Fonts preloaded + `font-display: block` on the display face; **cumulative layout shift measured at 0.00000**

## 9b. Fixes from review (2026-11-17)

- [x] 9b.1 Hero "compressed then expands" on load — General Sans was `font-display: swap`, so the justified
      wordmark laid out in a fallback face and re-flowed when the real font arrived. Now `block` + `<link rel=preload>`
      on weights 400/500. Verified CLS `0.00000`.
- [x] 9b.2 Footer wordmark clipped ("Emanyo Cha" — `rles` cut off). The reference's `21.93cqw` is tuned for
      "Lucas Lima" (10 chars); our 14-char name rendered 2120px into a 1469px box. Footer now measures the
      string's em-width after `document.fonts.ready` and sets `--mark-f` so the name always spans exactly.
      Now 1444px in 1461px, nothing clipped.
- [x] 9b.3 Work-tile sibling desaturation — verified already matching the reference:
      `saturate(.3) opacity(.7)` over `filter .3s cubic-bezier(.23,1,.32,1)`, plus name `translateX(6px)`.

## 9c. Interactive dot field (2026-11-17)

Confirmed against the reference: the dots are **not** a CSS gradient. They're a
`<canvas class="st-dots">`, fixed, `z-index:-1`, redrawn on pointer movement.
Algorithm lifted from the reference's own bundle (`App-DXE0skZX.js`):

```
GRID          = 50px        dot spacing
HOVER_RADIUS  = GRID * 6    = 300   cursor influence reach
HOVER_PUSH    = GRID * 0.25 = 12.5  max displacement AWAY from cursor
PRESS_RADIUS  = HOVER_RADIUS * 1.25 = 375
PRESS_PULL    = GRID * 0.32 = 16    max displacement TOWARD a mouse press
smoothstep(t) = t*t*(3-2*t)         falloff
easeOut(t,p)  = 1-(1-t)**p          press easing
press in      = 250ms, power 2      press out = 600ms, power 3
colour        = rgb(50 50 50 / .35), radius 1px, dpr-scaled
rows offset by -(scrollY % GRID) so the fixed canvas scrolls with the page
gated on (hover: hover) and (pointer: fine)
```

- [x] 9c.1 `DotField.tsx` — canvas replacing the static `body::before` gradient
- [x] 9c.2 Hover scatter (push away, smoothstep falloff over 300px)
- [x] 9c.3 Press gather (pull toward, 250ms in / 600ms out) — the reference has this too
- [x] 9c.4 Scroll-coupled row offset
- [x] 9c.5 Gradient kept as the touch / pre-mount fallback, hidden via `body:has(.st-dots[data-on])`
- [x] 9c.6 Reduced-motion: press resolves instantly, no rAF loop
- [x] 9c.7 Verified — at rest the canvas hashes **382752045**, byte-identical to the reference's
      same region; under a real pointer 1596 px change vs the reference's 1686

## 9d. Video toggle + first-visit intro (2026-11-18)

### Looping video with play/pause
Source: `LoopVideo-Dr8YdDH5.js`. The toggle is a **sibling** of the tile anchor,
never inside it — a button nested in a link is invalid HTML.

- [x] 9d.1 `LoopVideo.tsx` — muted/loop/playsInline/`preload=none`; IntersectionObserver
      at `threshold .15` plays only while on screen, `visibilitychange` pauses a hidden tab
- [x] 9d.2 `LoopToggle.tsx` — 32px capsule, `#1212118c` + `blur(8px)`, opacity .75→1 on hover,
      reference's exact play/pause SVG paths, `aria-controls` + label that flips Play/Pause
- [x] 9d.3 `.st-tile-toggle` at `bottom:42px; right:12px`, hidden under 1000px
- [x] 9d.4 Reduced motion swaps the custom toggle for native `controls`
- [x] 9d.5 **Bug found & fixed:** `container-type: inline-size` does *not* establish a
      containing block in Chrome (`contain` computes to `none`), so the toggle anchored to the
      page wrapper at x=1408 instead of the tile. `.st-tile-slot` now has `position: relative`.
- [x] 9d.6 Verified: click pauses that video, flips the label and icon, leaves the sibling
      video playing, and does **not** follow the tile link

### First-visit intro
A first visit and a refresh run genuinely different sequences.

```
repeat visit : .st-wi translateY(102%)→none, 800ms, stagger 60ms, ease cubic-bezier(.19,1,.22,1)
first visit  : words measured, then blown up and stacked down the centre of the screen
               scale  = min((vw - 2*gutter)/widestWord, vh*.86/(wordHeight*lines*.86))
               line   = wordHeight * scale * .86 ; top = (vh - line*lines)/2
               .st-wi  translateY(102%)→none   900ms  delay 80 + i*90   cubic-bezier(.19,1,.22,1)
               .st-ws  blownUp→translateX(0) scale(1)  1000ms delay 920  cubic-bezier(.76,0,.24,1)
               .st-wd  stacked→translateY(0)           950ms  delay 1200 cubic-bezier(.76,0,.24,1)
gate   : Promise.race([fonts.load('500 1em "General Sans"'), 1200ms])
phases : run → (1600ms) → go → done on finish; resize mid-intro aborts to the final state
--st-t0: .15s default | 1.6s first visit | 2.25s ≤720px | .45s reduced motion | 0s on nav
```

- [x] 9d.7 `useHeroPhase(ref)` rewritten to the Web Animations sequence above
- [x] 9d.8 Session key corrected to `intro`; module-level guard so it plays once per session
- [x] 9d.9 `--st-t0` schedule corrected (was a flat `0s`/`.45s`)
- [x] 9d.10 Verified by rapid capture: words rise, stack huge and centred, then collapse
      into the justified headline

## 9e. Slot shape follows media orientation (2026-11-18)

The reference doesn't place tiles by position alone — slot shape tracks what the
media *is*. Traktive (desktop screen recording) gets a wide `2/1`; Miinto (phone
capture) gets a narrow `4/5`. My fixed 7-slot rhythm ignored this, so the two were
inverted: IntelliQuest's wide desktop recording was cropped into a narrow portrait
box while Kinnected's phone capture sat letterboxed in a wide one.

- [x] 9e.1 `workGrid.ts` rewritten: tiles pair up two per row, and the wide slot goes
      to whichever of the pair holds landscape media. When both match, it alternates
      so the asymmetric rhythm still reads.
- [x] 9e.2 `orientation?: 'landscape' | 'portrait'` added to `ProjectInterface`,
      inferred from `liveOnMobile` / a `Mobile` category when absent
- [x] 9e.3 Landscape media in a narrow column now uses `4/3`, never the portrait `4/5`
- [x] 9e.4 Placements computed once in `ProjectsSection` and passed down, so a tile
      no longer recomputes its own position
- [x] 9e.5 Verified: IntelliQuest → `1/8` wide `16/10` (775px cover, recording legible);
      Kinnected → `9/13` narrow `4/5`
- [x] 9e.6 **Bug fixed:** toggle overlapped the `LIVE ↗` link. The reference's
      `bottom: 42px` clears a one-line foot; our tiles also carry a tech-stack line.
      Measured the real geometry and moved it to `66px` (foot 30 + stack 24 + 12 inset).

## 9f. Page typography corrected (2026-11-18)

Chasing the tile-caption size surfaced a much larger error: **the reference renders
the entire home page in General Sans, not Inter.** `body` is Inter 16px, but a page
wrapper overrides it, and every element that actually renders on the page inherits
from that wrapper:

```
.st-page { font-family: 'General Sans'; font-size: 17px; letter-spacing: -0.01em }
```

`letter-spacing` resolves to `-0.17px` at 17px and **inherits as an absolute length**,
not re-computed per font-size — which is why 13px, 14px and 15px text all carry the
same `-0.17px`. That detail is impossible to guess; it only shows up in computed styles.

My build had Inter 16px with `letter-spacing: normal` on the body, so everything
without an explicit `font-family` was rendering in the wrong face at the wrong tracking.

- [x] 9f.1 `.st-page` wrapper added, scoped to the portfolio route so `/projects` is untouched
- [x] 9f.2 Corrections measured against the live reference:
      `.st-tile-desc` → General Sans + inherited tracking (fixes `22ch` → 179.256px, was 194.3px)
      `.st-row-n` / `.st-row-d` 14px → **17px**
      `.st-expertise-label` 13px/400 → **12px/500**
      `.st-meta` 13px → **17px**, `margin-top` 10px → **22px**
      `.st-meta-role` tracking `.04em` → **`.01em`**, size → **14px/500**
      `.st-footer-row` 14px → **17px**
- [x] 9f.3 Verified **13/13 selectors byte-match** the reference's computed styles,
      including the derived `max-width: 179.256px`

**Recurring gotcha:** this is the third time a `globals.css` edit silently failed to
reach the browser. The `.next/postcss.js` worker caches compiled CSS; `touch` and
query-string busting do not clear it. Only `rm -rf .next` + a server restart does.

## 10. Deferred (user tweaks later)

- [x] 10.1 Hero wording settled: **SENIOR SOFTWARE ENGINEER** (was Full Stack). 3 words / 22 chars,
      so `--st-big-f` returns to the reference's own `0.0743` — 99.9% edge fill, no page scroll.
- [ ] 10.2 Project screenshots for tiles that lack good imagery
- [ ] 10.3 Populate `src/data/press.ts`
- [x] 10.4 Stray-comma subcopy gone — hero lede fully rewritten.
- [ ] 10.5 Decide EN/PT-style toggle (likely drop)
- [ ] 10.6 Dark theme (`[data-theme=dark]` tokens exist in reference)

---

## Decisions (answered 2026-11-13)

1. **Hero wordmark** — `SENIOR FULL STACK ENGINEER` (4 words, not 3 — `--st-big-f` retuned to fit one line).
2. **Project count** — more than 7. Placement map becomes a **repeating 4-row rhythm** so any count tiles correctly.
3. **Section lineup** — Hero → Selected Work → Things I Make on the Side → **Experience** → Writing → Footer.
   Experience stays (engineers get screened on it; Lucas can omit it because design sells on visuals).
   Retired: Capabilities, About (folds into hero lede), Press, Certification, Proof, MobileApps (becomes a Work category).
4. **Retire list** — confirmed: CustomCursor, ScrollProgress, BackToTop, InitialLoadScreen all go.
