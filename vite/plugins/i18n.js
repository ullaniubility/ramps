import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { fileURLToPath } from 'node:url'

export default function createVueI18n() {
    return vueI18n({
        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
        // compositionOnly: false,

        // you need to set i18n resource including paths !
        include: fileURLToPath(new URL('../../src/locales/**', import.meta.url))
    })
}
