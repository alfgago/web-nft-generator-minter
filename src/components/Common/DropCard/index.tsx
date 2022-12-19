// @ts-nocheck
import { useEffect, useState } from "react"
import Link from "next/link"

import { CommonPill } from "../CommonStyles"

import { DropCardStyles } from "./DropCardStyles"

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(yesterday.getDate() - 1)

const DropCard = ({ pass, classes = "" }: any) => {
  const [timer, setTimer] = useState("")
  const dropDate = new Date(pass.attributes.drop_date)
  const upcoming = yesterday < dropDate

  const _second = 1000
  const _minute = _second * 60
  const _hour = _minute * 60
  const _day = _hour * 24

  const dropDateTimer = () => {
    const now = new Date()
    const distance = dropDate - now
    if (distance < 0) {
      setTimer("DROPPED")
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
    /* const t = setInterval(() => {
      dropDateTimer()
    }, 1000)
    return () => setInterval(t)*/
    dropDateTimer()
  }, [])

  return (
    <DropCardStyles className={"drop-card " + classes}>
      <div className="image-container">
        <img
          src={pass.attributes.collection_preview_image?.data?.attributes.url}
          alt={pass.title}
        />
      </div>
      <div className="inner">
        <div className="titles">
          <div className="title">{pass.attributes.collection_name}</div>
          <div className="price">{pass.attributes.initial_price} ETH</div>
        </div>
        {upcoming ? (
          <div className="actions with-time">
            <Link href="/">
              <a>
                <CommonPill className="clickable blue small">
                  Set a reminder
                </CommonPill>
              </a>
            </Link>
            <span className="time">{timer}</span>
          </div>
        ) : (
          <div className="actions no-time">
            <Link href="/">
              <a>
                <CommonPill className="clickable blue small">
                  Buy Now
                </CommonPill>
              </a>
            </Link>
            <Link href="/">
              <a>
                <CommonPill className="clickable blue small">View</CommonPill>
              </a>
            </Link>
          </div>
        )}
      </div>
    </DropCardStyles>
  )
}

export default DropCard
