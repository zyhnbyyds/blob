import type { BytemdPlugin } from 'bytemd'
import { codeToHtml } from 'shiki'
import type { CodeToHastOptions } from 'shiki'

/**
 * Toggle the theme of the editor
 * @limit client only
 * @param theme The theme to toggle
 */
export function byteToggleTheme(
  theme: 'dark' | 'light',
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

interface Title {
  id: string
  text: string
  level: string
  tag: string
  children?: Title[]
}

function renderTitle(titles: Title[]) {
  let result = ''
  for (const title of titles) {
    if (title.children)
      result += `<${title.tag} id="${title.id}"><a class="link" href="#${title.id}">${title.text}</a>${renderTitle(title.children)}</${title.tag}>`
    else
      result += `<${title.tag} id="${title.id}"><a class="link" href="#${title.id}">${title.text}</a></${title.tag}>`
  }
  return result
}

/**
 * ByteMD plugin to show the code block with shiki
 * @param options The options for shiki
 */
export function shikiPlugin(options?: CodeToHastOptions): BytemdPlugin {
  return {
    viewerEffect(effect) {
      const { markdownBody } = effect
      const els = markdownBody.querySelectorAll<HTMLElement>('pre>code')

      if (!markdownBody.parentElement?.classList.contains('bytemd-preview')) {
        const titles = markdownBody.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6')
        if (titles.length !== 0) {
          const titlesArr = Array.from(titles).map((title, index) => {
            const titleText = title.textContent || ''
            title.id = title.tagName + index
            return {
              id: title.tagName + index,
              text: titleText,
              level: title.tagName.replace('H', ''),
              tag: title.tagName,
            }
          })

          const toRenders = renderTitle(titlesArr)

          const mdSideTitlesEle = markdownBody.parentElement?.parentElement?.querySelector('.md-side-title')

          if (mdSideTitlesEle) {
            mdSideTitlesEle.innerHTML = toRenders
            mdSideTitlesEle.querySelectorAll('.link').forEach((link) => {
              link.addEventListener('click', (e) => {
                e.preventDefault()
                const id = (e.target as HTMLElement).getAttribute('href')?.replace('#', '')
                const target = markdownBody.querySelector(`#${id}`)

                if (target)
                  target.scrollIntoView({ behavior: 'smooth' })
              })
            })
          }
        }
      }

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

        if (el.parentElement) {
          // add code header to the code block & add copy button & add {lang} to the code block
          const codeHeader = `<div class="shiki-code-header"><span class="code-lang">${lang}</span><span class="copy-btn">Copy</button></div>`
          el.innerHTML = code
          el.children[0].children[0].insertAdjacentHTML('beforebegin', codeHeader)

          // add copy event
          const copyBtn = el.parentElement?.querySelector('.copy-btn')
          copyBtn?.addEventListener('click', () => {
            const textArea = document.createElement('textarea')
            textArea.value = codeGet
            document.body.appendChild(textArea)
            textArea.select()
            navigator.clipboard.writeText(codeGet)
            document.body.removeChild(textArea)

            showMessage({ type: 'success', message: 'Copy success' })
          })
        }
      },
      )
    },
  }
}
