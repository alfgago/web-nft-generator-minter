import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
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
  const { data: user } = useSession()
  const userEmail = user?.user?.email
  const userId = user?.id
  const [managerEvents, setManagerEvents] = useState([])

  // Fetch the data in the useEffect hook
  useEffect(() => {
    console.log(userId)

    async function fetchData() {
      try {
        // if the user is loged in
        if (user) {
          /* get all the shows of the loged in user 
          that contains passes of single events */
          const { data } = await axios.get(
            "/api/shows?passType=Single Event&user=" + userId + "&deep=" + 3
          )

          setManagerEvents(
            data.data.map((event: any) => {
              const respImage =
                event.attributes.artist.data.attributes.profile_picture.data
                  .attributes.url

              return {
                name: event.attributes.name,
                // need to be changed

                image: respImage,
                description: event.attributes.description,
                id: event.attributes.name.replace(/ /g, ""),
              }
            })
          )
        }

        if (!user) {
          // change the route to get the nft of the actual user
          const { data } = await axios.get("/api/shows?nft=886&deep=3")
          const responseData = data.data

          setUserPasses(
            responseData.map((event: any) => {
              const respImage =
                event.attributes.artist.data.attributes.profile_picture.data
                  .attributes.url

              return {
                name: event.attributes.name,
                image: respImage,
                description: event.attributes.description,
                id: event.attributes.name.replace(/ /g, ""),
              }
            })
          )
        }
      } catch (err: any) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

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

      {user ? (
        <GroupChat
          type="forManager"
          userEvents={managerEvents}
          userId={userEmail!}
        />
      ) : (
        isConnected &&
        userPasses.length > 0 && (
          <GroupChat
            type="forWallet"
            userEvents={userPasses}
            userId={address}
          />
        )
      )}

      {/* {isConnected && userPasses.length > 0 && (
        <GroupChat userEvents={userPasses} userId={address} />
      )} */}
    </LayoutStyles>
  )
}
export default Layout
