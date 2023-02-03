import { useRouter } from "next/router"
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
      {isConnected && <GroupChat userId={address} />}
    </LayoutStyles>
  )
}
export default Layout
