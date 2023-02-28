// @ts-ignore
import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth';
export default NuxtAuthHandler({
  secret: process.env.NUXT_SECRET,
  providers: [
    // @ts-ignore
    CredentialsProvider.default({
      name: 'Credentials',
      credentiels: {},
      async authorize(credentials: any) {
        const response: any = await fetch(
          `${process.env.STRAPI_URL}/api/auth/local`,
          {
            method: 'POST',
            body: JSON.stringify({
              identifier: credentials.username,
              password: credentials.password
            })
          }
        )
        if (response.user) {
          const user: any = {
            id: response.id,
            name: response.user.username,
            email: response.jwt,
            profile: response.jwt
          }
          return user;
        } else {
          throw new Error('User not found')
        }
      }
    })
  ],
  session: {
    maxAge: 12 * 60 * 60,
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/register'
  }
})
