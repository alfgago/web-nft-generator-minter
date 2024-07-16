import React, { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { ThirdwebProvider, useLogin, useUser } from "@thirdweb-dev/react"

import SimpleHeader from "@/components/Common/SimpleHeader"
import { PasswordProtectStyles } from "@/components/Protect/PasswordProtectStyles"

const PasswordProtectPage = () => {
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login } = useLogin()
  const { user } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({ password })
      router.push("/protected-page")
    } catch (error) {
      console.error("Failed to login", error)
    }
  }

  return (
    <ThirdwebProvider>
      <Head>
        <title>Password Protected - PlusOne</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SimpleHeader title="Password Protected Page" />
      <PasswordProtectStyles>
        <div className="content">
          <div className="flex">
            <form onSubmit={handleSubmit}>
              <p>Enter Password:</p>
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button className="btn" type="submit">Login</button>
                </div>
              </div>
            </form>
            <img
              src="/assets/img/long-logo.svg"
              alt="P1 Logo"
              width={250}
              height={250}
            />
          </div>
        </div>
      </PasswordProtectStyles>
    </ThirdwebProvider>
  )
}
export default PasswordProtectPage
