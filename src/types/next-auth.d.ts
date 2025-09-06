import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      firstName?: string
      lastName?: string
      phone?: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    firstName?: string
    lastName?: string
    phone?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    firstName?: string
    lastName?: string
    phone?: string
  }
}
