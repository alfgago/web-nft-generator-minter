import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"
import { useAccount } from "wagmi"

import Footer from "../Footer"
import GroupChat from "../GroupChat"
import Navbar from "../Navbar"

import { LayoutStyles } from "./LayoutStyles"

const defaultVariants = {
  out: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

const onExitCompleteHandler = () => {
  window.scrollTo(0, 0)
}

const Layout = ({ children }: { children: JSX.Element }) => {
  const { asPath } = useRouter()
  const { address, isConnected } = useAccount()
  const [userPasses, setUserPasses] = useState([])
  // Fetch the data in the useEffect hook
  useEffect(() => {
    async function fetchData() {
      try {
        // change the route to get the passes of the actual user
        const { data } = await axios.get("/api/chat?nft=" + 886)
        const responseData = data.data

        const filteredArray = responseData.filter(
          (obj: any) =>
            obj.attributes.metadata &&
            obj.attributes.metadata.attributes[0].pass_type === "Single Event"
        )
        setUserPasses(filteredArray)
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  // console.log(userPasses)
  return (
    <LayoutStyles className="page-content">
      <Navbar />

      <AnimatePresence mode="wait" onExitComplete={onExitCompleteHandler}>
        <motion.div
          key={asPath}
          variants={defaultVariants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
      {isConnected && userPasses.length > 0 && (
        <GroupChat userEvents={userPasses} userId={address} />
      )}
    </LayoutStyles>
  )
}
export default Layout
