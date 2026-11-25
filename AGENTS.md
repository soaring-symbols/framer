# AGENTS.md

Instructions for AI coding agents working on the Soaring Symbols Framer plugin. Human-facing docs live in `README.md`.

## Project

A Framer plugin that searches the [Soaring Symbols](https://github.com/soaring-symbols/soaring-symbols) airlines and alliances and inserts their logos, icons and tails as SVG layers. It is a port of the [Figma plugin](https://github.com/soaring-symbols/figma) and keeps its structure; when a feature lands in one, consider the other.

- `framer.json` — the plugin manifest. `id` (`3eac9c`) identifies the plugin published on the [Framer Marketplace](https://www.framer.com/marketplace/plugins/soaring-symbols/); never change it, or Framer treats the plugin as a new one.
- `index.html` — the page Framer loads: the list view, the detail view and the footer. `src/main.ts` fills them in.
- `src/main.ts` — the whole plugin. Framer runs it in an iframe, and the `framer` object from `@framer/plugin` talks to the editor: `framer.addSVG` inserts a clicked mark (replacing the selected SVG, if one is selected), `framer.makeDraggable` makes each tile draggable onto the canvas, `framer.notify` reports, and `framer.isAllowedTo('addSVG')` disables the tiles for someone who can only view the project. It is plain TypeScript with the DOM, like the Figma plugin's UI, not React (React is only installed as a peer of `@framer/plugin`).
- `src/data.ts` — pure helpers, the same as the Figma plugin's apart from `sizeSvg`: data URLs (`DATA_LINE`), search ranking (`searchAirlines`, `searchAlliances`), asset tiles for an airline or an alliance (`MarkOwner`; `isAirline` tells them apart, alliances have icons and logos under `alliances/<slug>/` and no tail) (current ones, and with a `history` entry an older set under `history/<since>/`; `earlierMarks` lists them newest first), tinting mono SVGs (`tintSvg`) and sizing them (`sizeSvg`).
- `src/settings.ts` — the size and mono color, kept in the iframe's `localStorage`: they are the user's preferences, not the project's, so they don't go in `framer.setPluginData`.
- `src/styles.css` — on top of `@framer/plugin/framer.css`, whose `--framer-color-*` variables follow Framer's light and dark themes.
- `dev/host.html` — a stand-in for the Framer editor, to try the UI in a browser (see Gotchas).
- `test/` — unit tests for `src/data.ts` and `src/settings.ts`, run by Node's test runner with type stripping.
- `store/` — what the Marketplace page shows: `LISTING.md` (the text for the submission form), `icon.png`, `thumbnail.png` and the `screenshot-*.png` (the panel in the light and dark themes), copied from `exports/framer/` in [soaring-symbols/brand](https://github.com/soaring-symbols/brand), where they are rendered; change them there first. Update `LISTING.md` when a feature changes, and the images when the UI does. `public/icon.svg` is the icon `framer.json` points at, the same square icon as the website's favicon.

### Where the data comes from

As in the Figma plugin: `main.ts` loads `airlines.json`, `alliances.json` and the SVGs from the published `soaring-symbols` npm package through jsDelivr, pinned to one release line: `https://cdn.jsdelivr.net/npm/soaring-symbols@<DATA_LINE>/dist/…`, with `DATA_LINE` (`"0.<minor>"`) in `src/data.ts`. Every patch release reaches the plugin without an update; a breaking minor release never does until the plugin moves to it. If the list can't be loaded or isn't usable (`isAirlineList`), the plugin falls back to `listAirlines()` from the bundled `soaring-symbols` dependency and says so; `alliances.json` comes from the same release, falling back quietly to `listAlliances()` (`isAllianceList`).

Before loading, it asks jsDelivr which release the line points at (`RESOLVE_URL` on `data.jsdelivr.com`) and loads every file from that exact release (`setDataVersion`), so a browser cache that still holds a line URL never shows an old logo.

When the library releases a new minor line, update the plugin in one change: set `DATA_LINE`, move the `soaring-symbols` dependency to the line (`npm install soaring-symbols@^0.<minor>.0`, plus `bun install`), adapt the code, and submit a new version.

## Commands

| Command             | What it does                                                            |
| :------------------ | :---------------------------------------------------------------------- |
| `npm run dev`       | Vite dev server over HTTPS, which Framer loads as a development plugin. |
| `npm run build`     | Build `dist/` (git-ignored).                                            |
| `npm run pack`      | Build, then zip `dist/` into `plugin.zip` for the Marketplace.          |
| `npm run typecheck` | `tsc --noEmit`.                                                         |
| `npm run lint`      | ESLint, then Prettier in check mode.                                    |
| `npm run format`    | Prettier.                                                               |
| `npm test`          | `node --test` on `test/**/*.test.ts` (Node 22.18+).                     |

Dependencies are tracked in both `package-lock.json` and `bun.lock`; update both together. TypeScript is not listed: npm and bun install it as a peer of `typescript-eslint`, whose range decides the version `tsc` runs.

## Gotchas

- Mono SVGs are drawn in `currentColor`, so `markFor` replaces it with the chosen color (`tintSvg`) before a mark is inserted or dragged.
- Marks only have a square viewBox (`64` for logos, `24` for icons and tails); `sizeSvg` puts `width` and `height` on the root tag so the layer comes in at the chosen size.
- `framer.addSVG` replaces the selected SVG layer when there is one; the footer says so.
- `makeDraggable` asks for the drag data synchronously, so a tile becomes draggable only once its SVG has arrived, and its data reads the tile's latest mark (after a size or color change). Each call returns a cleanup, run when the tiles are replaced (`clearTiles`).
- Tile previews keep a light checkerboard in both themes, so dark marks stay readable; only the Dark background column is dark.
- `framer.css` gives every `button`, `input` and `select` a 134 × 30 box; the list rows, tiles and search field override it in `styles.css`.
- Outside Framer, `@framer/plugin` shows its own "This is a Framer Plugin" page instead of the plugin, and inside a page that doesn't answer its handshake it waits forever. To check the UI in a browser, open `dev/host.html`, which answers the handshake and logs every `framer.*` call: on the dev server at `/dev/host.html`, or copied into `dist/` after a build. `?readonly=1` denies `addSVG`.
- `vite-plugin-mkcert` serves the dev server over HTTPS; the first run creates a local certificate authority and may ask to trust it.

## Conventions

- Prettier (4 spaces, single quotes, no semicolons, trailing commas, width 80) and ESLint with `typescript-eslint`, including a blank line before `return`, as in the library repo.
- Commits follow Conventional Commits, e.g. `feat: add a tail filter`, `fix: keep mono color on reopen`.
