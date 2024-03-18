import { Snowflake } from '~/lib/snow-flake'
import { AddSchema } from '~/server/config/zod/article'
import { ArticleSchema } from '~/server/models/article'
import githubApp from '~/server/utils/github-app'
import { stringToBase64 } from '~/server/utils/stringToBase64'

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body =>
    AddSchema.safeParse(body))

  const installationId = Number.parseInt(import.meta.env.GITHUB_APP_INSTALLATION_ID)

  if (!result.success)
    return Err_400(event, result.error.message)

  const snowFlakeId = new Snowflake(1, 1).generateId()

  const timeNow = dayjs().format('YYYY-MM-DD HH:mm:ss')

  const octokit = await githubApp.getInstallationOctokit(installationId)

  octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'zyhnbyyds',
    repo: 'blob-md',
    path: `articles/${result.data.title}.md`,
    message: 'feat: add new article',
    content: stringToBase64(result.data.content),
    headers: {
      accept: 'application/vnd.github+json',
    },
  })

  await new ArticleSchema({
    ...result.data,
    id: snowFlakeId,
    createTime: timeNow,
    updateTime: timeNow,
    isDelete: false,
  }).save()

  return {
    id: String(snowFlakeId),
    msg: 'success',
  }
})
