import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const __root = dirname(fileURLToPath(import.meta.url))
const nuxtBuildDir = resolve(__root, '../../.nuxt')

const epResolver = ElementPlusResolver({ importStyle: 'css' })

/**
 * On-demand Element Plus (no full app.use / no index.css).
 */
export function elementPlusVitePlugins() {
  return [
    AutoImport({
      /** Nuxt already auto-imports Vue; only wire Element Plus APIs (e.g. ElMessage). */
      imports: [],
      resolvers: [epResolver],
      dts: resolve(nuxtBuildDir, 'element-plus-auto-import.d.ts'),
    }),
    Components({
      resolvers: [epResolver],
      dts: resolve(nuxtBuildDir, 'element-plus-components.d.ts'),
    }),
  ]
}
