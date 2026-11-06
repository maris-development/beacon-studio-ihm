# Brand: ihm

The brand of Beacon Studio IHM. The guide for all brand files is `src/brands/default/README.md`.

## Build

```
STUDIO_BRAND=ihm npm run dev
STUDIO_BRAND=ihm npm run build
```

In PowerShell: `$env:STUDIO_BRAND = "ihm"; npm run build`.

## Status

The files are copies of the `default` template. This brand has no overrides yet.

| File         | Content to add                                |
| ------------ | --------------------------------------------- |
| `brand.ts`   | Name, logo, links and endpoints               |
| `theme.scss` | Colors and fonts, in `:root` and `:root.dark` |
| `locales.ts` | Home page title, in every language            |
| `assets/`    | Logo file that `brand.ts` imports             |
| `static/`    | Favicons that replace the files in `static/`  |

## Rules

- Put only config in this folder. A new feature goes in the shared code, behind a `BrandConfig` field.
- Commit brand changes apart from feature changes. See `UPSTREAM.md`.
