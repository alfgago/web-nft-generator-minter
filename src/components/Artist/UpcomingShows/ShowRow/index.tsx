import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import AddToCalendar from "@/components/Common/AddToCalendar"
import { CommonPill } from "@/components/Common/CommonStyles"
import cleanUrl from "@/utils/cleanUrl"

import { ShowRowStyles } from "./ShowRowStyles"

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

const ShowRow = ({ item, index }: any) => {
  const initialPass = item.attributes.passes?.data[0]
  const [pass, setPass] = useState(initialPass)

  const imageUrl = item.attributes.passes.data.length
    ? pass.attributes.preview_image_url
    : "/assets/img/drop-pic-2.png"

  const dropDate = item.attributes.passes.data.length
    ? new Date(pass.attributes.drop_date)
    : today

  const dateFormat = (value: any) => {
    const date = new Date(value)
    const day = date.toLocaleString("default", { day: "2-digit" })
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.toLocaleString("default", { year: "numeric" })
    return day + " " + month + " " + year
  }

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
              </div>
              <div
                className="date"
                style={{
                  background:
                    index % 2 == 1 ? "#FFD1FB" : "rgba(104, 243, 243, 0.2)",
                }}
              >
                {dateFormat(item.attributes.date)}
              </div>
            </div>
            <div className="name name-mobile">
              <select
                onChange={(e: any) => {
                  selectPass(e.target.value)
                }}
              >
                {item.attributes.passes.data.length &&
                  item.attributes.passes.data.map((p: any, index: number) => (
                    <option key={"pass-item-" + p.id} value={index}>
                      {p.attributes.collection_name}
                    </option>
                  ))}
              </select>
              <img
                src="/assets/icons/chevron-down.svg"
                className="chevron"
                alt="chevron"
                width="32"
                height="23"
              />
            </div>
          </div>

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
            <div className="name">
              <select
                onChange={(e: any) => {
                  selectPass(e.target.value)
                }}
              >
                {item.attributes.passes.data.length &&
                  item.attributes.passes.data.map((p: any, index: number) => (
                    <option key={"pass-item-" + p.id} value={index}>
                      {p.attributes.collection_name}
                    </option>
                  ))}
              </select>
              <img
                src="/assets/icons/chevron-down.svg"
                className="chevron"
                alt="chevron"
                width="32"
                height="23"
              />
            </div>
          </div>
        </div>
        {pass?.attributes.pass_type == "Lottery" ? (
          <div className="wrap-end">
            <div className="time">
              <span className="timer-title">Time until drawing</span>
              {timer}
            </div>
            <div className="actions">
              <Link href={"/pass/" + pass.attributes.contract_address}>
                <CommonPill className="clickable blue small">
                  Enter Lottery
                </CommonPill>
              </Link>
              <AddToCalendar
                label="Add lottery reminder"
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
              <Link href={"/pass/" + pass?.attributes.contract_address}>
                <CommonPill className="clickable blue small">
                  Buy pass
                </CommonPill>
              </Link>
            </div>
          </div>
        )}
      </div>
    </ShowRowStyles>
  )
}

export default ShowRow