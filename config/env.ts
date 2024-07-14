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

export const auth = {
  jwtSecret: import.meta.env.JWT_PRIVATE_VAL,
}

export const mongo = {
  uri: import.meta.env.MONGODB_URI,
  dbName: import.meta.env.MONGODB_NAME,
}

export const email = {
  email: import.meta.env.EMAIL,
  password: import.meta.env.EMAIL_PASS,
}
