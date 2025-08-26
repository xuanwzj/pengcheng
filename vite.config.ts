import uni from '@dcloudio/vite-plugin-uni'
import autoprefixer from 'autoprefixer'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import uniPolyfill from 'vite-plugin-uni-polyfill'
import svgLoader from 'vite-svg-loader'
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite'

const dir = (...path: string[]) => resolve(__dirname, ...path)

export default defineConfig(async () => {
  return {
    base: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
    assetsInclude: ['**/*.svg'],

    plugins: [
      // Uniapp
      uni(),

      // Polyfill
      uniPolyfill(),

      // Tailwind CSS
      uvtw({
        rem2rpx: true,
        customAttributes: {
          '*': ['custom-class']
        },
        ignoreCallExpressionIdentifiers: ['card', 'skeleton']
      }),

      // SVG Loader
      svgLoader(),

      AutoImport({
        imports: ['vue', 'pinia', 'uni-app'],
        vueTemplate: true,
        dts: dir('typings/auto-imports.d.ts')
      })
    ],

    resolve: {
      alias: {
        '@': dir('src')
      }
    },

    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()]
      }
    }
  }
})
