import { useEffect } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"

import ROUTES from "./Config/routes"

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { status, data } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== "loading") {
      if (status === "unauthenticated") {
        router.push(ROUTES.HOME)
      }
    }
  }, [router, status, data])

  if (status === "authenticated") return <>{children}</>

  return null
}

export default AuthGuard
