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

export interface UserInfo {
  id: string
  email: string | null
  profileUrl: string | null
  name: string | null
}

const Layout = ({ children }: { children: JSX.Element }) => {
  const { asPath } = useRouter()
  const { address, isConnected } = useAccount()
  const { data: user } = useSession()
  const [validTime, setValidTime] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [events, setEvents] = useState([])

  const slug = asPath.replaceAll("/", "")

  const getTime = (targetTime: any, now: any) => {
    const remainingTime = targetTime.getTime() - now.getTime()
    const seconds = Math.floor(remainingTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return { hours: hours, minutes: minutes, seconds: seconds }
  }
  async function fetchData() {
    try {
      // If the user is logged in
      let apiResponse

      if (user) {
        /* get all the shows of the loged in user 
          that contains passes of single events */
        const { data } = await axios.get(
          // @ts-ignore
          "/api/shows/manager-chats?user=" + user.id
        )

        apiResponse = data.data
        const userData = apiResponse.length
          ? apiResponse[0].attributes.artist.data.attributes.user.data
              .attributes
          : null

        if (userData) {
          setUserInfo({
            id: "id_" + userData.email,
            name: userData.name,
            email: userData.email,
            profileUrl: "",
          })
        }
      }

      if (!user && address) {
        const walletEvents = await axios.get(
          "/api/nfts/owned?address=" + address
        )

        // by the list of the shows get only the event attribute
        const eventsArray = walletEvents.data.map((el: any) => {
          return el.metadata.attributes
            .map((item: any) => {
              return item.trait_type === "event" && item.value
            })
            .filter((event: any) => event !== false)
        })

        const filteredEventArr: number[] = []
        // remove the repeated values and undefined
        eventsArray.map((el: any) => {
          el[0] != undefined &&
            el !== false &&
            !filteredEventArr.includes(parseInt(el[0])) &&
            filteredEventArr.push(parseInt(el[0]))
        })
        // format the array to send in url
        const jsonArray = JSON.stringify(filteredEventArr)

        const { data } = await axios.get(
          "/api/shows/manager-chats?eventList=" + jsonArray
        )
        apiResponse = data.data

        setUserInfo({
          id: "id_" + address?.toString()!,
          name: address?.toString()!,
          email: "",
          profileUrl: "",
        })
      }

      setEvents(
        apiResponse
          .map((event: any) => {
            const totalTime = getTime(
              new Date(event.attributes.date),
              new Date()
            )
            if (totalTime.minutes > 2880 || totalTime.minutes < 0) {
              return null
            }
            setValidTime(true)
            const respImage =
              event.attributes.artist.data.attributes.profile_picture.data
                .attributes.url
            return {
              artistName: event.attributes.artist.data.attributes.name,
              name: event.attributes.name,
              image: respImage,
              description: event.attributes.description,
              id: event.attributes.name.replace(/ /g, ""),
            }
          })
          .filter((event: any) => event !== null)
      )
    } catch (e: any) {
      console.log("No chat events found")
    }
  }
  // Fetch the data in the useEffect hook
  useEffect(() => {
    fetchData()
  }, [user, isConnected])

  return (
    <LayoutStyles className={`page-content slug-${slug ? slug : "home"}`}>
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

      {user && validTime ? (
        <GroupChat type="forManager" userEvents={events} userInfo={userInfo} />
      ) : (
        validTime &&
        isConnected &&
        events.length > 0 && (
          <GroupChat type="forWallet" userEvents={events} userInfo={userInfo} />
        )
      )}
    </LayoutStyles>
  )
}
export default Layout
