import { oauth, redisConfig } from './config/env'

export default defineNuxtConfig({
  features: {
    devLogs: true,
    inlineStyles: false,
    noScripts: true,
  },

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
    'nuxt-auth-utils',
    'nuxt-typed-router',
  ],

  colorMode: {
    classSuffix: '',
  },

  ssr: false,

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

  runtimeConfig: {
    oauth,
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

  pinia: {
    storesDirs: ['~/store'],
  },

  experimental: {
    clientFallback: true,
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
})
