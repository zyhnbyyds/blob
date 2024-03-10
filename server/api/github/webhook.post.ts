export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  logger.info(`Received webhook event: ${JSON.stringify(body)}`)
})
