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
      redis: {
        driver: 'redis',
        host: '127.0.0.1',
        port: 6379,
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
