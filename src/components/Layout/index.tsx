import { useRouter } from "next/router"
import { AnimatePresence, motion } from "framer-motion"

import AnimatedCursor from "../Common/AnimatedCursor"
import Footer from "../Footer"
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
          <AnimatedCursor />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </LayoutStyles>
  )
}
export default Layout
