import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

const clientId = import.meta.env.GITHUB_APP_CLIENT_ID
const clientSecret = import.meta.env.GITHUB_APP_CLIENT_SECRET

export default NuxtAuthHandler({
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId,
      clientSecret,
    }),
  ],
})
