import { App, Octokit } from 'octokit'
import logger from './logger'

class GithubApp {
  initApp() {
    const appId = import.meta.env.GITHUB_APP_ID
    const secret = import.meta.env.GITHUB_APP_WEBHOOK_SECRET
    const privateKey = import.meta.env.GITHUB_APP_PRIVATE_KEY_PATH

    const app = new App({
      appId,
      privateKey,
      webhooks: {
        secret,
      },
      Octokit: Octokit.defaults({}),
    })

    app.webhooks.onError((error) => {
      if (error.name === 'AggregateError')
        logger.error(`Error processing request: ${error.event}`)

      else
        logger.error(`Error processing request: ${error.event}`)
    })
    return app
  }
}

const githubApp = (new GithubApp()).initApp()

export default githubApp
