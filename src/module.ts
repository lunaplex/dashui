import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  installModule,
  addComponentsDir,
  addImportsDir
} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@lunaplex/dashui',
    configKey: 'dashui'
  },
  defaults: {},
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    nuxt.options.css.push(resolve(runtimeDir, 'ui.css'))

    // Modules

    await installModule('@vueuse/nuxt')
    await installModule('radix-vue/nuxt')
    await installModule('nuxt-icon')
    await installModule('@nuxt/image')
    await installModule('@nuxtjs/tailwindcss', {
      exposeConfig: true,
      viewer: false,
      configPath: resolve(runtimeDir, 'tailwind.config.js')
    })
    await installModule('@nuxt/fonts', {
      families: [{ name: 'Manrope', provider: 'fontsource' }],
      defaults: {
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ['normal']
      }
    })

    // Plugins

    addPlugin({
      src: resolve(runtimeDir, 'plugins', 'chartjs')
    })

    // Components

    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'sidebar'),
      watch: false
    })
    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'elements'),
      watch: false
    })
    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'charts'),
      watch: false
    })
    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'ui'),
      watch: false
    })

    // Composables

    addImportsDir(resolve(runtimeDir, 'utils'))
    addImportsDir(resolve(runtimeDir, 'types'))
  }
})
