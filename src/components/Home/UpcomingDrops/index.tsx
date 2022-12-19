import Link from "next/link"

import { CommonPill } from "@/components/Common/CommonStyles"
import DropCard from "@/components/Common/DropCard"

import { UpcomingDropsStyles } from "./UpcomingDropsStyles"

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

const UpcomingDrops = ({
  title = "Upcoming Drops",
  buttonTitle,
  buttonLink,
  useBorderTop = true,
  passes,
}: any) => {
  return (
    <UpcomingDropsStyles className={`blue ${useBorderTop ? "useBorder" : ""}`}>
      {useBorderTop && (
        <img
          src="/assets/img/top-triangle.png"
          alt="border-top"
          className={"top-triangle"}
        />
      )}
      <section>
        <div className="content">
          <div className="head-title">
            <h2>{title}</h2>
            <Link href={buttonLink}>
              <CommonPill className={"btn clickable blue small"}>
                {buttonTitle}
              </CommonPill>
            </Link>
          </div>
          <div className="drops">
            {passes.map((item: any, index: number) => {
              const dropDate = new Date(item.attributes.drop_date)
              const upcoming = yesterday < dropDate
              if (true) {
                return (
                  <DropCard
                    key={"lottery-row" + index}
                    pass={item}
                    classes={"home"}
                  />
                )
              }
            })}
          </div>
        </div>
      </section>
    </UpcomingDropsStyles>
  )
}

export default UpcomingDrops
