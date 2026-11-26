# Publishing to the Framer Marketplace

How a new version of the plugin reaches the [Framer Marketplace](https://www.framer.com/marketplace/plugins/soaring-symbols/). Framer publishes a submitted version at once, with no review, so check it well before uploading. The text and images the form asks for are in [`LISTING.md`](LISTING.md).

New airlines and fixed marks need no new version: the plugin loads them from the soaring-symbols package on jsDelivr. Publish when the plugin's own code or listing changes, or when it moves to a new release line of the package (see "Where the data comes from" in `AGENTS.md`).

## Before publishing

1. Start from an up-to-date `main` with nothing uncommitted, and run the checks:

    ```bash
    npm run typecheck && npm run lint && npm test
    ```

2. Try the UI in `dev/host.html` (see "Try the UI without Framer" in `README.md`), in both themes, and the build in Framer itself: **Plugins → Developer Tools → Open Development Plugin** with `npm run dev` running. Insert a mark by clicking and by dragging, and open a second airline after going back to the list.
3. If the UI changed, render the Marketplace images again in [soaring-symbols/brand](https://github.com/soaring-symbols/brand) (`npm run render` there, which draws the panel from its own copy of the layout) and copy `exports/framer/*.png`, all but `poster.png`, into `store/` under the same names.
4. If a feature changed, update the description in `LISTING.md`.

## Build

```bash
npm run pack
```

This builds `dist/` and zips it into `plugin.zip` (git-ignored). Never change `id` in `framer.json`: Framer would take the upload as a new plugin.

## Upload

1. Signed in to Framer, open your creator profile, where the Marketplace dashboard used to be, and the Soaring Symbols plugin there.
2. Upload `plugin.zip` as the plugin's new version. The form's labels may change; it asks for the zip, and for any listing field you want to update.
3. If the listing changed, paste the fields from `LISTING.md` (the byline is at most 34 characters) and upload the images: `store/icon.png` where it asks for an image of the icon, then `store/thumbnail.png` first and the `store/screenshot-*.png` in the Media field (1600 × 1200 each).
4. Submit. The new version is live once Framer confirms it; open the [Marketplace page](https://www.framer.com/marketplace/plugins/soaring-symbols/) and the plugin in a project to check.

## After publishing

- Push the commits the version was built from, and tag nothing: the plugin has no versions of its own outside Framer.
- If the update brings a change users notice, add a line for it under `### Ecosystem` in the release notes of the soaring-symbols release that shipped the feature (`docs/RELEASING.md` in the library repo says how). A plugin counts once its update is live on the Marketplace.
- Keep `LISTING.md` in step with what is live.
