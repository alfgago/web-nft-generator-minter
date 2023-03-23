import Image from "next/image"
import Link from "next/link"
import { ReactSVG } from "react-svg"

import { CommonPill } from "@/components/Common/CommonStyles"
import cleanUrl from "@/utils/cleanUrl"

import { MoreStyles } from "./MoreStyles"

const MoreSection = ({
  title,
  buttonTitle,
  buttonLink,
  description,
  type = "blue",
  useBorderTop = false,
  image,
}: any) => {
  const img = image?.data?.attributes
  const imageUrl = img?.url
  const imageW = img?.width
  const imageH = img?.height

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
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
          {imageUrl && (
            <div className="image-cont">
              <Image
                src={cleanUrl(imageUrl)}
                width={imageW}
                height={imageH}
                alt="PlusOne illustrative image"
              />
            </div>
          )}
          {type == "purple" && (
            <div className="floating-icons">
              <ReactSVG
                className="square1"
                src="/assets/img/square.svg"
                wrapper="span"
              />
              <ReactSVG
                className="square2"
                src="/assets/img/square.svg"
                wrapper="span"
              />
              <ReactSVG
                className="star"
                src="/assets/img/star.svg"
                wrapper="span"
              />
            </div>
          )}
        </div>
      </section>
    </MoreStyles>
  )
}

export default MoreSection
