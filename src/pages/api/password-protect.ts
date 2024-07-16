// api/password-protect.ts
import { NextApiRequest, NextApiResponse } from "next"
import { serialize } from "cookie"
import { ThirdwebSDK } from "@thirdweb-dev/sdk"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed")
  }

  const { password } = req.body
  const sdk = new ThirdwebSDK("https://rpc-mumbai.maticvigil.com")

  try {
    const contract = await sdk.getContract("0xYourContractAddress")
    const isValidPassword = await contract.call("validatePassword", password)

    if (isValidPassword) {
      const cookie = serialize("p1login", "true", {
        path: "/",
        httpOnly: true,
      })
      res.setHeader("Set-Cookie", cookie)
      return res.redirect(302, "/")
    } else {
      const url = new URL("/password-protect", req.headers["origin"])
      url.searchParams.append("error", "Incorrect Password")
      return res.redirect(url.toString())
    }
  } catch (error) {
    return res.status(500).send("Internal Server Error")
  }
}
