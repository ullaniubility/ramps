import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
import postcss from 'postcss-px-to-viewport-8-plugin'

const pxtovwConfig = postcss({
  //这里是设计稿宽度 自己修改
  viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
  unitPrecision: 6, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
  viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
  selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
  minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
  mediaQuery: false // 允许在媒体查询中转换`px`
})

export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: './',
    server: {
      host: '0.0.0.0',
      open: true,
      port: 9000,
      // proxy: {
      //   "/api": {
      //     target: 'http://47.243.202.3:9901',
      //     rewrite: (path) => path.replace("/api", ""),
      //   }
      // }
    },
    build: {
      sourcemap: env.VITE_BUILD_SOURCEMAP == 'true',
      minify: 'terser',
      cssCodeSplit: true,
      // target: 'es2015',
      terserOptions: {
        compress: {
          drop_console: env.VITE_BUILD_DROP_CONSOLE == 'true'
        }
      },
      rollupOptions: {
        output: { //静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    plugins: [
      ...createVitePlugins(env, command === 'build', env.VITE_APP_PRIMITIVE)
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
        }
      },
      postcss: {
        // plugins: [pxtovwConfig]
      }
    }
  })
}
