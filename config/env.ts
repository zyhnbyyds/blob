export const redisConfig = {
  driver: 'redis',
  host: import.meta.env.REDIS_HOST,
  port: import.meta.env.REDIS_PORT,
  password: import.meta.env.REDIS_AUTH_PASS,
}

export const oauth = {
  github: {
    clientId: import.meta.env.GITHUB_CLIENT_ID,
    clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
  },
}
