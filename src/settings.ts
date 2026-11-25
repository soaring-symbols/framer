// The plugin's settings, kept in the plugin iframe's localStorage: they are
// the user's own preferences, not part of the project, so they don't go in
// framer.setPluginData, which every editor of the project would share.

export interface Settings {
    /** Width and height of an inserted mark, in pixels. */
    size: number
    /** Six-digit hex color that mono marks are painted with. */
    monoColor: string
}

export const DEFAULT_SETTINGS: Settings = { size: 64, monoColor: '#000000' }

export const SIZES = [16, 24, 32, 48, 64, 96, 128, 256]

const KEY = 'soaring-symbols:settings'
const HEX = /^#[0-9a-f]{6}$/i

// Saved settings, with the defaults for anything missing or unusable
export const parseSettings = (raw: string | null): Settings => {
    let saved: Partial<Record<keyof Settings, unknown>> = {}
    try {
        const data: unknown = raw ? JSON.parse(raw) : {}
        if (data && typeof data === 'object') saved = data
    } catch {
        // A broken value is as good as none
    }

    return {
        size: SIZES.includes(saved.size as number)
            ? (saved.size as number)
            : DEFAULT_SETTINGS.size,
        monoColor:
            typeof saved.monoColor === 'string' && HEX.test(saved.monoColor)
                ? saved.monoColor
                : DEFAULT_SETTINGS.monoColor,
    }
}

// Storage can be blocked (a private window, site data turned off); the
// plugin then starts from the defaults every time
export const loadSettings = (): Settings => {
    try {
        return parseSettings(localStorage.getItem(KEY))
    } catch {
        return { ...DEFAULT_SETTINGS }
    }
}

export const saveSettings = (settings: Settings): void => {
    try {
        localStorage.setItem(KEY, JSON.stringify(settings))
    } catch {
        // Not remembered, but still used for this session
    }
}
