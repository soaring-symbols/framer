# Soaring Symbols for Framer

A Framer plugin to search airlines by name, IATA or ICAO code and drop their [Soaring Symbols](https://github.com/soaring-symbols/soaring-symbols) logos, icons and tails into your designs, along with the marks of airline alliances.

> [!NOTE]
> The plugin is not on the Framer Marketplace yet. Try it by running it as a development plugin, as described under [Development](#development).

- Search 160+ airlines by name, other names they go by (SWISS), IATA or ICAO code, callsign or slug, and alliances (oneworld, SkyTeam, Star Alliance) by name. Cargo airlines are marked "Cargo", and searching "cargo" lists them.
- Insert a mark by clicking it, or drag it onto the canvas. A clicked mark replaces the selected SVG layer, if there is one.
- Pick the size of inserted marks (16 to 256 px) and the color of monochrome marks, or use the airline's primary color. Both are remembered.
- Each mark type gets a row with its color, mono and dark-background versions in columns; the dark one is shown on a dark preview.
- Airlines with a stacked logo, the name under the mark, list it beside the horizontal one (e.g. Japan Airlines, Vietnam Airlines).
- Marks come in as SVG layers, named after the airline (e.g. "Vietnam Airlines icon (mono)").
- Airlines that changed their logo also list their earlier marks, under the years each was used.

## Development

Node 22.18 or newer.

```bash
npm install
npm run dev
```

Open a project in Framer, in the browser or the desktop app, and choose **Plugins → Developer Tools → Open Development Plugin**. Framer loads the plugin from the dev server and reloads it on every change. The first run of the dev server sets up a local HTTPS certificate and may ask you to trust it.

To look at the UI without Framer, open `https://localhost:5173/dev/host.html`, a stand-in for the editor that logs what the plugin asks Framer to do.

| Command             | What it does                                                           |
| :------------------ | :--------------------------------------------------------------------- |
| `npm run dev`       | Vite dev server for Framer's development plugin.                       |
| `npm run build`     | Build `dist/`.                                                         |
| `npm run pack`      | Build and zip `dist/` into `plugin.zip` for the Framer Marketplace.    |
| `npm run typecheck` | Type-check with TypeScript.                                            |
| `npm run lint`      | ESLint and Prettier.                                                   |
| `npm test`          | Unit tests for `src/data.ts` and `src/settings.ts` (Node test runner). |

## License

The plugin's code is [MIT](LICENSE). The airline marks are trademarks of their owners; read the package's [Disclaimer](https://github.com/soaring-symbols/soaring-symbols/blob/main/DISCLAIMER.md) before using them.
