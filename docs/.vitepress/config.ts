import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'blob-docs',
  description: 'Nuxt fullstack boilerplate with Vite, Redis, MongoDB, and more!',
  head: [
    ['link', {
      href: '/logo.ico',
      rel: 'shortcut icon',
    }],
  ],

  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: 'frontend',
        items: [
          { text: 'index', link: '/front_end' },
        ],
      },
      {
        text: 'apis',
        items: [
          { text: 'index', link: '/api' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zyhnbyyds' },
    ],

    logo: '/logo.ico',
  },
})
