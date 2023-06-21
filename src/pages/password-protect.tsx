import React from "react"
import Head from "next/head"

import SimpleHeader from "@/components/Common/SimpleHeader"
import { PasswordProtectStyles } from "@/components/Protect/PasswordProtectStyles"

const PasswordProtectPage = () => {
  return (
    <>
      <Head>
        <title>Password Protected - PlusOne</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SimpleHeader title="Password Protected Page" />
      <PasswordProtectStyles>
        <div className="content">
          <div className="flex">
            <form action="/api/password-protect" method="post">
              <p>Enter Password:</p>
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    name="password"
                    className="input input-bordered"
                  />
                  <button className="btn">Login</button>
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
    </>
  )
}
export default PasswordProtectPage
