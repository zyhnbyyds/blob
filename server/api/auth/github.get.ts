export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    await setUserSession(event, {
      user,
    })

    logger.info(JSON.stringify(tokens))

    return sendRedirect(event, '/manage')
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error(error)
    return sendRedirect(event, '/login')
  },
})
