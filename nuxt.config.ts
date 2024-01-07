import { redisConfig } from './config/redis'

const baseUrl = (import.meta.env.AUTH_ORIGIN || 'http://localhost:3000')

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
  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs',
      defaultProvider: 'github',
      trustHost: true,
    },
    globalAppMiddleware: true,
    baseUrl,
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
