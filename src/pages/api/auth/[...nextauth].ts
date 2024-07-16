/* eslint-disable max-len */
/* eslint-disable new-cap */
// @ts-nocheck
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { ThirdwebAuth } from "@thirdweb-dev/auth/next-auth"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

const sdk = new ThirdwebSDK("your-network-url")

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
        const data = await sdk.auth.login({
          email: credVal.email,
          password: credVal.password,
        })

        const user = {
          ...data.user,
          access_token: data.jwt,
        }

        return { ...user }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "@/components/Login/LoginForm",
  },
  callbacks: {
    //   jwt callback is only called when token is created
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.jwt = user.access_token
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return Promise.resolve(token)
    },
    /* session callback is called whenever a session for that particular user is checked */
    session: async ({ session, token }: any) => {
      session.jwt = token.jwt
      session.id = token.id
      return Promise.resolve(session)
    },
  },
}

export default NextAuth(authOptions)
