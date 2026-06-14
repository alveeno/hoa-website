# House of Arras — A Perfect 100 Points

An independent, informational website celebrating a historic moment in wine: the
**House of Arras E.J. Carr Late Disgorged 1998 Magnum** becoming the **first
non‑Champagne sparkling wine ever to score a perfect 100 points** from the
**Robert Parker Wine Advocate**, awarded by critic **Erin Larkin** (2026).

The site is written for a general audience — no wine knowledge assumed. It
explains what the achievement is, what the 100‑point scale means, who gave the
score, and who made the wine.

## Pages

| Page | File | What it covers |
| --- | --- | --- |
| The Announcement | `index.html` | The headline, the key facts, why it matters |
| The Wine | `the-wine.html` | The bottle, tasting notes, "late disgorged" explained, the magnum |
| The 100‑Point Score | `understanding-the-score.html` | The Wine Advocate, how the scale works, why 100 is historic |
| The Critic | `the-critic.html` | Erin Larkin and why her verdict carries weight |
| The House | `about-arras.html` | House of Arras, Tasmania, Ed Carr, a timeline |

## Tech

- Plain, dependency‑free **HTML / CSS / JavaScript** — no build step.
- Shared `css/style.css` and `js/main.js`.
- Custom SVG artwork (the 100‑point seal, bottle, gauges) — no third‑party brand assets are used.
- Google Fonts (Cormorant Garamond, EB Garamond, Jost) loaded via CDN.
- Respects `prefers-reduced-motion`.

## Run locally

It's a static site, so just open `index.html` in a browser — or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy (GitHub Pages)

A workflow at `.github/workflows/deploy.yml` publishes the site automatically.

1. In the repository, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` or `claude/vigilant-johnson-f8d0fm` (or run the workflow
   manually via **Actions → Deploy to GitHub Pages → Run workflow**).

The deployed URL appears in the workflow run summary and under Settings → Pages.

## Accuracy & sources

Content is based on publicly reported coverage of the announcement, including:

- Drinks Trade — *House of Arras breaks Champagne ceiling with 100‑point Wine Advocate score*
- Winetitles — *House of Arras named first Aussie sparkling wine producer with 100 points from Robert Parker Wine Advocate*
- Drinks Digest — *Australia's first 100‑point sparkling wine rating from Robert Parker*
- Robert Parker Wine Advocate — rating‑system documentation and Erin Larkin's contributor profile

## Disclaimer

This is an independent, educational project about a publicly reported
achievement. It is **not affiliated with, authorised by, or endorsed by** House
of Arras, the Robert Parker Wine Advocate, or Erin Larkin. All trademarks and
brand names belong to their respective owners. Please enjoy wine responsibly.
