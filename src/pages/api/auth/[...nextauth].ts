import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { signInRequest } from "../sign-in"
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        // credentials from the form
        const credVal = credentials as {
          email: string
          password: string
        }

        // api validation request
        try {
          const data = await signInRequest({
            email: credVal.email,
            password: credVal.password,
          })
          const user = {
            ...data.data,
            access_token: data.jwt,
          }

          if (data) {
            return data
          }

          return null
        } catch (error) {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "@/components/Login/LoginForm",
  },
  callbacks: {
    //   jwt callback is only called when token is created
    jwt: async ({ token, user, account }: any) => {
      if (user) {
        token.jwt = user.jwt
        token.id = user.id
        token.name = user.username
        token.email = user.email
        token.token = user.token
      }
      return Promise.resolve(token)
    },
    /* session callback is called whenever a session for that particular user is checked*/
    session: async ({ session, token }: any) => {
      // console.log(token)
      session.jwt = token.jwt
      session.id = token.id
      return Promise.resolve(session)
    },
  },
}

export default NextAuth(authOptions)
