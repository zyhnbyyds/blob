import { pwa } from './config/pwa'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxt/devtools',
    '@ant-design-vue/nuxt',
    '@sidebase/nuxt-auth',
  ],

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    'ant-design-vue/dist/reset.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  ssr: false,

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  pwa,

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  auth: {
    isEnabled: true,
  },
})
