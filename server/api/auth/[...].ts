import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  secret: 'test-auth',
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR.
    CredentialsProvider.default({
      id: 'test',
      type: 'credentials',
      name: 'blob-back',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials: any, _req: any) {
        if (!credentials)
          return null
        if (credentials.username === 'jsmith' && credentials.password === 'password') {
          return {
            id: '1233',
            usename: 'test',
            password: '@test.com',
          }
        }
        return null
      },
    }),
  ],
})
