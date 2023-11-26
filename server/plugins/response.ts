import { useLogger } from '@nuxt/kit'
import { handleNitroHookEvent } from '~/server/utils/hooks-handle'

export default defineNitroPlugin((nitroApp) => {
  const logger = useLogger()

  nitroApp.hooks.hook('error', async (event) => {
    if (event) {
      const now = new Date().toLocaleString()
      logger.withTag(`${now}`).error(`App error -> ${event.message}`)
    }
  })

  nitroApp.hooks.hook('afterResponse', async (event, data) => {
    const { status, dateNow, method, path } = handleNitroHookEvent(event)
    let body: any

    if (method !== 'GET')
      body = await readBody(event)

    if (status >= 400)
      logger.withTag(dateNow).withTag(` ${method.toUpperCase()} -> ${status} ${path}`).error(data?.body)
    else
      logger.withTag(dateNow).withTag(` ${method.toUpperCase()} -> ${status} ${path}`).success(body ?? 'success')
  })
})
