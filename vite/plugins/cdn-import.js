import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'

export default function createCdnImport() {
    return importToCDN({
        modules: [
            autoComplete('vue'),
            {
                name: 'vue-demi',
                var: 'VueDemi', //根据main.js中定义的来
                version: '0.13.11',
                path: 'lib/index.iife.js'
            },
            autoComplete('axios'),
            {
                name: 'vant',
                var: 'vant', //根据main.js中定义的来
                version: '4.0.2',
                path: 'lib/vant.min.js',
                css: 'lib/index.css'
            },
            {
                name: 'vue-router',
                var: 'vue-router', //根据main.js中定义的来
                version: '4.1.6',
                path: 'dist/vue-router.global.js'
            },
            {
                name: 'vue-i18n',
                var: 'vue-i18n', //根据main.js中定义的来
                version: '9.1.9',
                path: 'dist/vue-i18n.global.js'
            }
        ],
    })
}