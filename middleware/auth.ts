import { showMessage } from '~/utils/message'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server)
    return

  const { loggedIn } = useUserSession()

  if (loggedIn.value) {
    if (from.path === '/login' && to.path === '/manage')
      return
    else if (to.path === '/login' && from.path.startsWith('/manage'))
      return abortNavigation()
  }

  if (!loggedIn.value && to.path.startsWith('/manage') && from.path !== '/login') {
    await showMessage({
      type: 'loading',
      position: 'center',
      message: 'Jump to Login',
      duration: 500,
      mask: true,
    })
    return navigateTo('/login')
  }
})
