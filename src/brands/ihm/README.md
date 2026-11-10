# Brand: ihm

The brand of Beacon Studio IHM. The guide for all brand files is `src/brands/default/README.md`.

## Build

```
STUDIO_BRAND=ihm npm run dev
STUDIO_BRAND=ihm npm run build
```

In PowerShell: `$env:STUDIO_BRAND = "ihm"; npm run build`.

## Status

The brand follows the IHM mockup (Rijkshuisstijl). It changes only the look. The functionality is that of Beacon Studio.

| File               | Content                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `brand.ts`         | Name "IHM Beacon Studio" and the white IHM logo                                                  |
| `theme.scss`       | Colors, Source Sans 3, near square corners, the light blue logo band and the home banner         |
| `locales.ts`       | Home title and subtitle, logo text and logo alt text, in en, es, it and nl                       |
| `assets/`          | `logo.png` (white, trimmed) and `banner.jpg` (2110 x 450)                                        |
| `fonts/`           | Source Sans 3, latin and latin-ext (OFL-1.1). RO Sans comes first in the font list, if installed |
| `static/favicons/` | Placeholder icons made from the IHM logo. IHM supplies the final icons later                     |

Notes:

- The logo is white, so the sidebar and the phone bar get a light blue band (`#8fcae7`). The text on the band is lintblauw (`#154273`): white text on that blue fails WCAG AA.
- The home banner fade uses pixel stops. The text stays on lintblauw at every screen width, and only a wide screen shows the banner.
- The band and the banner stay the same in dark mode.

## Later work

- The data catalogue "Explore the data" on the home page. This is a feature: shared code behind a `BrandFeature` id.
- Hero extras of the mockup: the line above the title, the action buttons and the stats row.
- IHM example queries (`endpoints.homeExamples`) and the IHM node as the default node (`endpoints.publicNodes`).
- A sidebar link to ihm.nl, and a "Powered by Beacon" footer on the home page.
- The table browser dialog of the query builder.
- The final IHM favicons.
- A yellow focus ring on inputs. `ui/input` reads `--ring`, which has no definition. AGENTS.md asks for a separate change.
- About 110 fixed corner values in 60 files (plots, data browser, users) stay rounded.
- The root font size of the mockup (14.5px).

## Rules

- Put only config in this folder. A new feature goes in the shared code, behind a `BrandConfig` field.
- Commit brand changes apart from feature changes. See `UPSTREAM.md`.
