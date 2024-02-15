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
    '@nuxtjs/i18n',
  ],

  colorMode: {
    classSuffix: '',
  },

  css: ['bytemd/dist/index.css'],

  vite: {
    optimizeDeps: {
      include: ['lodash-es'],
    },
  },

  app: {
    pageTransition: true,
    layoutTransition: true,
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
