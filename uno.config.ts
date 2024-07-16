import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'
import presetTagify from '@unocss/preset-tagify'

export default defineConfig({
  shortcuts: [
    // flex
    ['flex-center', 'flex justify-center items-center'],
    ['flex-col-center', 'flex items-center'],
    ['flex-row-center', 'flex justify-center'],

    // position
    ['fixed-x-c', 'absolute left-1/2 -translate-x-1/2'],
    ['ab-y-c', 'absolute top-1/2 -translate-y-1/2'],
    ['ab-c', 'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'],
    ['ab-0', 'absolute left-0 top-0'],

    // fixed
    ['fixed-x-c', 'fixed left-1/2 -translate-x-1/2'],
    ['fixed-y-c', 'fixed top-1/2 -translate-y-1/2'],
    ['fixed-c', 'fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'],
    ['fixed-0', 'fixed left-0 top-0'],

    ['hw-full', 'h-full w-full'],

    ['text-over-one', 'overflow-hidden w-full text-nowrap text-ellipsis'],
    ['text-common', 'text-#333 text-sm dark:text-#e5e5e5 text-14px transition-colors'],
    ['bg-common', 'bg-light-300 dark:bg-#1a1a1a transition-colors'],
  ],
  presets: [
    presetTagify(),
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: ['i-', ''],
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
        maShan: 'Ma Shan Zheng',
        mali: 'Mali',
        ljmc: 'Liu Jian Mao Cao',
      },
    }),
    // @ts-expect-error missing types
    presetScrollbar(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
