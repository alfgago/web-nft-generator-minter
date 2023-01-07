import Link from "next/link"

import { CommonPill } from "@/components/Common/CommonStyles"

import { MoreStyles } from "./MoreStyles"

const MoreSection = ({
  title,
  buttonTitle,
  buttonLink,
  description,
  type = "blue",
  useBorderTop = false,
}: any) => {
  return (
    <MoreStyles className={`${type} ${useBorderTop ? "useBorder" : ""}`}>
      {useBorderTop && (
        <img
          src="/assets/img/top-triangle.png"
          alt="border-top"
          className={"top-triangle"}
        />
      )}
      <section>
        <div className="content">
          <h2>{title}</h2>
          <Link legacyBehavior href={buttonLink}>
            <CommonPill className={"btn clickable " + type}>
              {buttonTitle}
            </CommonPill>
          </Link>
          <div className="description">{description}</div>
        </div>
      </section>
    </MoreStyles>
  )
}

export default MoreSection
