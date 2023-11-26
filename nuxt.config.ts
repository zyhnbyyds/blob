export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    'nuxt-lodash',
    '@nuxt/ui',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    devStorage: {
      db: {
        driver: 'fs',
        base: './data/db',
      },
    },
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  ui: {
    global: true,
    icons: 'all',
  },
})
