import { redisConfig } from './config/redis';

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/devtools',
    'nuxt-lodash',
    '@unocss/nuxt',
    'nuxt-mongoose',
    'nuxt-typed-router',
    'nuxt-auth-utils',
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/image',
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

  nitro: {
    devStorage: {
      redis: redisConfig,
    },
    storage: {
      redis: redisConfig,
    },
  },

  devtools: {
    enabled: false,
    timeline: {
      enabled: true,
    },
  },
});
