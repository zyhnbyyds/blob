import { redisConfig } from './config/redis'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    'nuxt-lodash',
    '@unocss/nuxt',
    '@ant-design-vue/nuxt',
    'nuxt-mongoose',
    'nuxt-typed-router',
    'nuxt-auth-utils',
  ],

  colorMode: {
    classSuffix: '',
  },

  css: ['@unocss/reset/tailwind-compat.css'],

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
})
