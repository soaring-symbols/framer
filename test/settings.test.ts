import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { DEFAULT_SETTINGS, parseSettings } from '../src/settings.ts'

describe('parseSettings', () => {
    it('reads saved settings', () => {
        assert.deepEqual(parseSettings('{"size":128,"monoColor":"#d99e09"}'), {
            size: 128,
            monoColor: '#d99e09',
        })
    })

    it('gives the defaults for nothing saved or a broken value', () => {
        assert.deepEqual(parseSettings(null), DEFAULT_SETTINGS)
        assert.deepEqual(parseSettings('not json'), DEFAULT_SETTINGS)
        assert.deepEqual(parseSettings('[1, 2]').size, DEFAULT_SETTINGS.size)
    })

    it('replaces a size not offered or a color that is not a hex color', () => {
        assert.deepEqual(parseSettings('{"size":17,"monoColor":"red"}'), {
            ...DEFAULT_SETTINGS,
        })
        assert.equal(parseSettings('{"size":32}').size, 32)
    })
})
