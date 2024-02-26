import type { Preset, StaticShortcutMap } from '@unocss/core'

export const commonText = [
  [
    'text-common',
    'text-#333 text-sm dark:text-#e5e5e5 text-14px transition-colors',
  ],
  ['bg-common', 'bg-#fff dark:bg-#1a1a1a transition-colors'],
]

export const commonLayout = []

export const commonColor = []

export default [...commonText] as Exclude<
  Preset['shortcuts'],
  undefined | StaticShortcutMap
>
