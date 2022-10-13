import { UpcomingDropsStyles } from "./UpcomingDropsStyles"

const UpcomingDrops = ({ title = "Upcoming Drops" }: any) => {
  return (
    <UpcomingDropsStyles className="blue">
      <section>
        <div className="content">
          <h2>{title}</h2>
        </div>
      </section>
    </UpcomingDropsStyles>
  )
}

export default UpcomingDrops
