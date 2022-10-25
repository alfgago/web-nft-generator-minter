import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }
        //the logic of the login goes here
        //db validatins user goes here
        const url = ""
        const user = { email: email, password: password }
        const response = await axios.post(url, user)
        if (response) {
          console.log(response)
        }

        //validate the wrong scenario
        if (email !== "test@example.com" || password !== "123") {
          throw new Error("Invalid credentials")
        }
        return { id: "12", name: email }
      },
    }),
  ],
  pages: {
    signIn: "@/components/Login/LoginForm",
  },
}

export default NextAuth(authOptions)
