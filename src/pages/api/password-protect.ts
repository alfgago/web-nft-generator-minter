// api/password-protect.ts
import { NextApiRequest, NextApiResponse } from "next"
import { serialize } from "cookie"
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed")
  }
  const password = req.body.password
  if ("P!U$0N3" === password) {
    const cookie = serialize("p1login", "true", {
      path: "/",
      httpOnly: true,
    })
    res.setHeader("Set-Cookie", cookie)
    res.redirect(302, "/")
  } else {
    const url = new URL("/password-protect", req.headers["origin"])
    url.searchParams.append("error", "Incorrect Password")
    res.redirect(url.toString())
  }
}
