# Framer Marketplace listing

<!-- The Description is pasted into Framer as plain text: bold lines stand in for headings, and URLs stay bare -->
<!-- markdownlint-disable no-emphasis-as-heading no-bare-urls -->

The text and images for the submission form at https://www.framer.com/marketplace/plugins/, with `plugin.zip` from `npm run pack`. A plugin is published as soon as it is submitted; there is no review. Keep this file in step with what is live once the plugin is published.

## Images

- Icon: `public/icon.svg`, which `framer.json` points at, and `store/icon.png` (128×128) where the form asks for an image.
- Thumbnail: `store/thumbnail.png` (1920×1080).
- Screenshots (1600×1200): `store/screenshot-marks-light.png` and `store/screenshot-marks-dark.png`, an airline's marks in the light and dark themes, and `store/screenshot-search-light.png`, the list.

All are copied from `exports/framer/` in [soaring-symbols/brand](https://github.com/soaring-symbols/brand), which renders them; change them there first. Framer publishes no required sizes; its best practices ask for images that show the plugin with little text.

## Name

Soaring Symbols

## Tagline

Airline and alliance logos, icons and tails as SVG: search by name or code, then click or drag.

## Description

Soaring Symbols puts a curated collection of airline logos, icons and tail designs into Framer as SVG layers, along with the marks of the airline alliances.

**Find an airline**

- Search by name, other names it goes by (SWISS), IATA code (VN), ICAO code (HVN), callsign or slug.
- Every airline shows its codes, country and alliance; airlines that have ceased operations are marked.
- Cargo airlines and cargo brands (Cargolux, Qatar Airways Cargo) carry a Cargo badge; search "cargo" to list them.
- Alliances are there too: search oneworld, SkyTeam or Star Alliance and insert their icons the same way.

**Use its marks**

- Click a logo, icon or tail to insert it, or to replace the selected SVG with it.
- Or drag it onto the canvas.
- Pick the size, from 16 to 256 px.
- Paint monochrome marks in any color, or in the airline's primary color in one click.
- See each mark's color, monochrome and dark-background versions side by side, one row per logo, icon or tail.
- Airlines with a stacked logo, the name under the mark, offer it beside the horizontal one (Japan Airlines, Vietnam Airlines).
- Layers are named after the airline, like "Vietnam Airlines icon (mono)".
- Airlines that changed their logo also show their earlier marks, under the years each was used.

**Always up to date**

The marks come from the Soaring Symbols collection, so new airlines, alliances and fixed SVGs show up without a plugin update.

- Website: https://soaringsymbols.org
- Source: https://github.com/soaring-symbols/framer
- Missing an airline or spotted an outdated logo? Contribute at https://github.com/soaring-symbols/soaring-symbols

Logos and icons are shown for reference. The trademarks belong to their airlines; Soaring Symbols claims no ownership of them.

## Support contact

https://github.com/soaring-symbols/framer/issues
