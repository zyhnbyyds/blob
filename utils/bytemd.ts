import type { MdTheme } from '~/config/bytemd';

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
  const linkTags = document.querySelectorAll('link');
  for (const link of linkTags) {
    if (link.href.includes('md-themes')) link?.remove();
  }

  // add timestamp to the link to avoid cache
  const now = useTimestamp();
  const linkHref = `../../style/scss/md-themes/${theme}.scss?timeNow=${now.value}`;

  const href = new URL(linkHref, url).href;

  // Add theme link tag
  useHead({
    link: [
      {
        rel: 'stylesheet',
        href,
      },
    ],
  });
}
