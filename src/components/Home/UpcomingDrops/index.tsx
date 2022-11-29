import GradientBackground from "@/components/Common/GradientBackground"

import { UpcomingDropsStyles } from "./UpcomingDropsStyles"

const UpcomingDrops = ({ title = "Upcoming Drops" }: any) => {
  return (
    <UpcomingDropsStyles className="blue">
      <GradientBackground />
      <section>
        <div className="content">
          <h2>{title}</h2>
        </div>
      </section>
    </UpcomingDropsStyles>
  )
}

export default UpcomingDrops
