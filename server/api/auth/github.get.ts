export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },

  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user,
    })

    return sendRedirect(event, '/article/list')
  },
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
