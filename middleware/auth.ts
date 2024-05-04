import { closeMessage, showMessage } from '~/utils/message'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (import.meta.server)
    return

  const { loggedIn } = useUserSession()

  if (loggedIn.value)
    return

  await showMessage({
    type: 'loading',
    position: 'center',
    message: 'Jump to Login',
    duration: 500,
    mask: true,
  })

  if (!loggedIn.value && to.path.startsWith('/manage')) {
    closeMessage()
    return navigateTo('/manage/login')
  }
})
