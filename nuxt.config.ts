import { redisConfig } from './config/redis'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    'nuxt-lodash',
    '@sidebase/nuxt-auth',
    '@unocss/nuxt',
  ],

  colorMode: {
    classSuffix: '',
  },

  css: ['@unocss/reset/tailwind-compat.css'],

  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs',
      defaultProvider: 'github',
      trustHost: true,
    },
    globalAppMiddleware: true,
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
})
