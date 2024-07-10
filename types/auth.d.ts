declare module '#auth-utils' {

  interface GithubUser {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    name: string
    company: null
    blog: string
    location: string
    email: string
    hireable: boolean
    bio?: string
    twitter_username: string
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: Date
    updated_at: Date
  }
  /** github user info */
  interface User extends Partial<GithubUser> {
    [key: string]: any

  }

  interface SelfUser {
    userId: number
    email: string
    roles: number[] | number
  }

  interface UserSession {
    user?: User
    [key: string]: any
  }
}

export {}
