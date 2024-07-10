export default defineNitroPlugin(() => {
  sessionHooks.hook('fetch', (session, _event) => {
    if (session.user)
      logger.info(session)
  })

  sessionHooks.hook('clear', (_session, event) => {
    sendRedirect(event, '/login')
  })
})
