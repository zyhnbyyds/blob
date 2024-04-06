import { redisConfig } from './config/redis'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    'nuxt-lodash',
    '@unocss/nuxt',
    'nuxt-mongoose',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  colorMode: {
    classSuffix: '',
  },

  mongoose: {
    devtools: true,
    options: {
      dbName: 'blob',
    },
  },

  css: ['bytemd/dist/index.css'],

  vite: {
    optimizeDeps: {
      include: ['lodash-es'],
    },
  },

  nitro: {
    devStorage: {
      redis: redisConfig,
    },
    storage: {
      redis: redisConfig,
    },
  },

  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  app: {
    head: {
      link: [
        {
          href: '/logo.ico',
          rel: 'shortcut icon',
        },
      ],
    },
  },
})
