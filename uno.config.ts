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
import { shortcuts } from './config/unocss'

export default defineConfig({
  shortcuts: [
    // flex
    ['flex-center', 'flex justify-center items-center'],
    ['flex-col-center', 'flex items-center'],
    ['flex-row-center', 'flex justify-center'],

    // position
    ['ab-x-c', 'absolute left-1/2 -translate-x-1/2'],
    ['ab-y-c', 'absolute top-1/2 -translate-y-1/2'],
    ['ab-c', 'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'],
    ['ab-0', 'absolute left-0 top-0'],

    ['hw-full', 'h-full w-full'],

    ['text-over-one', 'overflow-hidden w-full text-nowrap text-ellipsis'],
    ...shortcuts,
  ],
  presets: [
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
      },
    }),
    presetScrollbar(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
