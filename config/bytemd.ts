export const themes = ['hydrogen', 'fancy'] as const

export type MdTheme = (typeof themes)[number]
