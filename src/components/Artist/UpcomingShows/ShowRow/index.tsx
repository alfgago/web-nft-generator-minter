import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ReactSVG } from "react-svg"
import { useWindowSize } from "usehooks-ts"

import AddToCalendar from "@/components/Common/AddToCalendar"
import { CommonPill } from "@/components/Common/CommonStyles"
import Tooltip from "@/components/Tooltip"
import cleanUrl from "@/utils/cleanUrl"
import dateFormat from "@/utils/dateFunctions"

import { ShowRowStyles } from "./ShowRowStyles"

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

const ShowRow = ({ item, index }: any) => {
  const { width } = useWindowSize()
  const isMobile = width < 1080
  const initialPass = item.attributes.passes?.data[0]
  const [pass, setPass] = useState(initialPass)
  const eventImage =
    item.attributes?.image?.data?.attributes?.url ??
    "/assets/img/drop-pic-2.png"
  const imageUrl = item.attributes.passes.data.length
    ? pass.attributes.preview_image_url
    : eventImage

  const dropDate = item.attributes.passes.data.length
    ? new Date(pass.attributes.drop_date)
    : today

  const [timer, setTimer] = useState("")

  const _second = 1000
  const _minute = _second * 60
  const _hour = _minute * 60
  const _day = _hour * 24

  const dropDateTimer = () => {
    const now = new Date()
    // @ts-ignore
    const distance = dropDate - now
    if (distance < 0) {
      setTimer("AVAILABLE")
      return
    }
    const days = Math.floor(distance / _day)
    const hours = Math.floor((distance % _day) / _hour)
    const minutes = Math.floor((distance % _hour) / _minute)
    const seconds = Math.floor((distance % _minute) / _second)

    setTimer(`${hours * (days + 1)}h ${minutes}m ${seconds}s`)
    return
  }

  useEffect(() => {
    dropDateTimer()
  }, [pass])

  const selectPass = (passIndex: number) => {
    const selectedPass = item.attributes.passes?.data[passIndex]
    setPass(selectedPass)
  }

  const SelectComponent = ({ customClass = "" }) => {
    return (
      <div className="select-component">
        <div className="howto">Access Options: </div>
        <div className={`name ${customClass}`}>
          {item.attributes.passes.data.length ? (
            <>
              <select
                onChange={(e: any) => {
                  selectPass(e.target.value)
                }}
              >
                {item.attributes.passes.data.length ? (
                  item.attributes.passes.data.map((p: any, index: number) => (
                    <option key={"pass-item-" + p.id} value={index}>
                      {p.attributes.collection_name}
                    </option>
                  ))
                ) : (
                  <option>No pass available for this show</option>
                )}
              </select>

              <ReactSVG
                src="/assets/icons/chevron-down.svg"
                className="chevron"
                alt="chevron"
                width="32"
                height="23"
              />
            </>
          ) : (
            <div>No pass available for this show</div>
          )}
        </div>
      </div>
    )
  }

  const DateShow = () => {
    return (
      <div
        className="date"
        style={{
          background: index % 2 == 1 ? "#FFD1FB" : "rgba(104, 243, 243, 0.2)",
        }}
      >
        {dateFormat(item.attributes.date)}
      </div>
    )
  }

  return (
    <ShowRowStyles>
      <div className="cont">
        <div className="wrap-main">
          <div className="main-cont">
            <div className="row-1 ">
              <div className="event-name">
                <div className="name">
                  <span>{item.attributes.name} </span>
                </div>
                <div className="place">
                  <span>
                    {item.attributes.venue_name} {item.attributes.address}{" "}
                    {item.attributes.city}
                  </span>
                </div>
                {isMobile && <span>{dateFormat(item.attributes.date)}</span>}
              </div>

              {isMobile && (
                <div className="collection">
                  <Image
                    src={cleanUrl(imageUrl)}
                    width={200}
                    height={200}
                    alt={
                      item.attributes.passes.data.length
                        ? pass.attributes.collection_name + " image"
                        : "-"
                    }
                  />
                </div>
              )}
              {!isMobile && <DateShow />}
            </div>
            {isMobile && <SelectComponent customClass="name-mobile" />}
          </div>

          {!isMobile && (
            <div className="collection">
              <Image
                src={cleanUrl(imageUrl)}
                width={200}
                height={200}
                alt={
                  item.attributes.passes.data.length
                    ? pass.attributes.collection_name + " image"
                    : "-"
                }
              />
              <SelectComponent />
            </div>
          )}
        </div>
        {pass?.attributes.pass_type == "Circle" ? (
          <div className="wrap-end">
            <div className="time">
              <span className="timer-title">Time until giveaway</span>
              {timer}
            </div>
            <div className="actions">
              <Link href={"/pass/" + pass.attributes.contract_address}>
                <CommonPill className="clickable blue small">
                  Enter Giveaway
                </CommonPill>
              </Link>
              <Tooltip text="If you already own a Circle Pass, connect your wallet to enter the giveaway." />
              <AddToCalendar
                label="Add giveaway reminder"
                id={pass.id}
                title={pass.attributes.collection_name}
                date={dropDate}
              />
            </div>
          </div>
        ) : (
          <div className="wrap-end">
            <div className="time">
              <span className="timer-title">Time until drop</span>
              {timer}
            </div>
            <div className="actions">
              {item.attributes.passes.data.length ? (
                <Link href={"/pass/" + pass?.attributes.contract_address}>
                  <CommonPill className="clickable blue small">
                    Buy pass
                  </CommonPill>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </ShowRowStyles>
  )
}

export default ShowRow
