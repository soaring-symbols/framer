import { defineConfig, type Plugin } from 'vite'
import framer from 'vite-plugin-framer'
import mkcert from 'vite-plugin-mkcert'

// Framer, a public site, loads the development plugin from localhost.
// Chrome's Private Network Access checks ask the local server, in a
// preflight, to allow that with this header, which Vite's CORS doesn't send.
// It is set on the HTTP server ahead of every middleware, since the CORS
// one answers the preflight before a plugin's middleware would run.
const allowPrivateNetwork = (): Plugin => ({
    name: 'allow-private-network',
    configureServer(server) {
        server.httpServer?.prependListener('request', (_req, res) => {
            res.setHeader('Access-Control-Allow-Private-Network', 'true')
        })
    },
})

// mkcert serves the dev server over HTTPS, which Framer needs to load a
// development plugin; vite-plugin-framer sets the build target Framer
// supports and inlines small CSS into index.html
export default defineConfig({
    plugins: [allowPrivateNetwork(), mkcert(), framer()],
})
