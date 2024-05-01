import { uuidCreate } from '../utils/uuid'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('error', async (event) => {
    if (event)
      logger.error(`App error -> ${event}`)
  })

  const parseString = (object: any) => {
    return JSON.stringify(object)
  }

  let timeNow: number
  nitroApp.hooks.hook('request', () => {
    timeNow = Date.now()
  })

  nitroApp.hooks.hook('beforeResponse', async (event, data) => {
    const { path } = handleNitroHookEvent(event)
    if (data.body && typeof data.body === 'object' && path.startsWith('/api'))
      (data.body as any).requestId = uuidCreate()
  })

  nitroApp.hooks.hook('afterResponse', async (event, data) => {
    const { status, method, path } = handleNitroHookEvent(event)
    const payload = (method === 'GET' || method === 'DELETE') ? getQuery(event) : await readBody(event)

    if (!path.startsWith('/api'))
      return
    const resSpend = Date.now() - timeNow
    logger[status >= 400 ? 'error' : status === 200 ? 'info' : 'warn'](`${method.toUpperCase()} -> ${status} ${path}(${resSpend}ms) [payload]: ${parseString(payload)} => [response]: ${parseString(data)}`)
  })
})
