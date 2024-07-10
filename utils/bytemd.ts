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

function transformTitleLowToHighChild(titles: Title[]) {
  if (titles.length === 0)
    return []
  const result: Title[] = []
  let lastTitle: Title | undefined
  for (const title of titles) {
    if (!lastTitle) {
      lastTitle = title
      result.push(title)
    }
    else if (title.level === lastTitle.level) {
      lastTitle = title
      result.push(title)
    }
    else {
      if (!lastTitle.children)
        lastTitle.children = []
      lastTitle.children.push(title)
    }
  }
  return result
}

function renderTitle(titles: Title[]) {
  let result = ''
  for (const title of titles) {
    if (title.children)
      result += `<${title.tag} id="${title.id}"><a class="link" href="#${title.id}">${title.text}</a>${renderTitle(title.children)}</${title.tag}>`
    else
      result += `<${title.tag} id="${title.id}"><a class="link" href="#${title.id}">${title.text}</a></${title.tag}>`
  }
  return `<div class="md-side-title">${result}</div>`
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
      const titles = markdownBody.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6')

      if (titles.length !== 0) {
        const titlesArr = Array.from(titles).map((title) => {
          const titleText = title.textContent || ''
          const titleId = titleText.replace(/\s+/g, '-').toLowerCase()
          title.id = titleId
          return {
            id: titleId,
            text: titleText,
            level: title.tagName.replace('H', ''),
            tag: title.tagName,
          }
        })

        const toRenders = renderTitle(transformTitleLowToHighChild(titlesArr))
        const titlesEle = document.createElement('div')
        titlesEle.innerHTML = toRenders
        markdownBody.parentElement?.prepend(titlesEle)

        markdownBody.parentElement?.querySelectorAll('.link').forEach((link) => {
          link.addEventListener('click', (e) => {
            e.preventDefault()
            const id = (e.target as HTMLElement).getAttribute('href')?.replace('#', '')
            const target = markdownBody.querySelector(`#${id}`)
            if (target)
              target.scrollIntoView({ behavior: 'smooth' })
          })
        })
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

        if (el.parentElement)
          el.parentElement.innerHTML = code
      },
      )
    },
  }
}
