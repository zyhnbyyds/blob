import logger from '../utils/logger'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', async (event) => {
    if (event)
      logger.error(`App error -> ${event.message}`)
  })

  nitroApp.hooks.hook('afterResponse', async (event, data) => {
    const { status, method, path } = handleNitroHookEvent(event)

    if (!path.startsWith('/api'))
      return

    if (status >= 400)
      logger.info(` ${method.toUpperCase()} -> ${status} ${path}${data?.body}`)
    else
      logger.info(` ${method.toUpperCase()} -> ${status} ${path}`)
  })
})
