import Link from "next/link"

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
        <div className="background-gradient">
          <img src="/assets/img/star.svg" alt="gradient" className={"star"} />
          <img
            src="/assets/img/square.svg"
            alt="gradient"
            className={"square square-1"}
          />
          <img
            src="/assets/img/square.svg"
            alt="gradient"
            className={"square square-2"}
          />
          <img
            src="/assets/img/square.svg"
            alt="gradient"
            className={"square square-3"}
          />
        </div>

        <div className="content">
          <h2>{title}</h2>
          <Link href={buttonLink}>
            <a className="btn">{buttonTitle}</a>
          </Link>
          <div className="description">{description}</div>
        </div>
      </section>
    </MoreStyles>
  )
}

export default MoreSection
