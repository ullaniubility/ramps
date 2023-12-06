import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createComponents from './components'
import createCompression from './compression'
import createHtml from './html'
import createVueI18n from './i18n'
import createLegacy from './legacy'
// import createRollupPluginVisualizer from './rollup-plugin-visualizer'

export default function createVitePlugins(viteEnv, isBuild = false, primitive = false) {
    const vitePlugins = [vue(), createVueI18n()]
    
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createComponents())
    vitePlugins.push(createCompression(primitive))
    vitePlugins.push(createLegacy())
    vitePlugins.push(createHtml(viteEnv, isBuild, primitive))
    // vitePlugins.push(createRollupPluginVisualizer())

    return vitePlugins
}
