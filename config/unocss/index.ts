import type { Preset } from 'unocss'
import common from './common'

export function blobPreset(): Preset {
  return {
    name: 'blob',
    shortcuts: [
      // flex
      ['flex-center', 'flex justify-center items-center'],
      ['flex-col-center', 'flex items-center'],
      ['flex-row-center', 'flex justify-center'],
      ['trans-all-300-ease', 'transition-all duration-300 transition-ease'],

      // position
      ['ab-x-c', 'absolute left-1/2 -translate-x-1/2'],
      ['ab-y-c', 'absolute top-1/2 -translate-y-1/2'],
      ['ab-c', 'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'],
      ['ab-0', 'absolute left-0 top-0'],

      ['hw-full', 'h-full w-full'],

      ...common,
    ],
  }
}

export const shortcuts = [
  ...common,
]
