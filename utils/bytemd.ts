import type { BytemdPlugin } from 'bytemd'
import { codeToHtml } from 'shiki'
import type { CodeToHastOptions } from 'shiki'
import type { MdTheme } from '~/config/bytemd'

/**
 * Toggle the theme of the editor
 * @limit client only
 * @param theme The theme to toggle
 */
export function byteToggleTheme(
  theme: MdTheme | 'dark' | 'light',
  url: string,
) {
  // Remove theme link tag
  const linkTags = document.querySelectorAll('link')
  for (const link of linkTags) {
    if (link.href.includes('md-themes'))
      link?.remove()
  }

  // add timestamp to the link to avoid cache
  const now = useTimestamp()
  const linkHref = `../../style/scss/md-themes/${theme}.scss?timeNow=${now.value}`

  const href = new URL(linkHref, url).href

  // Add theme link tag
  useHead({
    link: [
      {
        rel: 'stylesheet',
        href,
      },
    ],
  })
}

/**
 * ByteMD plugin to show the code block with shiki
 * @param options The options for shiki
 */
export function shikiPlugin(options?: CodeToHastOptions): BytemdPlugin {
  return {
    viewerEffect({ markdownBody }) {
      const els = markdownBody.querySelectorAll<HTMLElement>('pre>code')
      if (els.length === 0)
        return
      els.forEach(async (el) => {
        const lang = el.className.replace('language-', '')
        el.className = `${el.className} shiki-code`
        const codeGet = el.textContent || ''
        const code = await codeToHtml(codeGet, useAssign(options, {
          lang,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        }))

        if (el.parentElement)
          el.parentElement.innerHTML = code
      },
      )
    },
  }
}
