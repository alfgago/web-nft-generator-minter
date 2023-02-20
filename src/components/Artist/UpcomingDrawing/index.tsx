import { useEffect, useState } from "react"
import axios from "axios"

import { CommonPill } from "@/components/Common/CommonStyles"
import Countdown from "@/components/Common/CountDown"

import {
  BoxDrawing,
  DrawRow,
  UpcomingDrawingStyles,
} from "./UpcomingDrawingStyles"

const Artist = ({ artistId }: any) => {
  const [drawing, setDrawing] = useState([])

  async function fetchData() {
    try {
      const { data } = await axios.get(
        "/api/passes?type=Lottery&future=true&artist=" + artistId
      )
      // Update the state with the response data
      const passes = data.data
      setDrawing(passes)
    } catch (err: any) {
      console.log(err)
    }
  }

  // const currentDate = new Date()
  const before48Hours = (currentDate: Date) => {
    return new Date(currentDate.getTime() - 48 * 60 * 60 * 1000)
  }

  const getTime = (targetTime: any, now: any) => {
    const remainingTime = targetTime.getTime() - now.getTime()
    const seconds = Math.floor(remainingTime / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    return { hours: hours, minutes: minutes, seconds: seconds }
  }

  console.log(drawing)
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <UpcomingDrawingStyles>
      <div className="content">
        <h2 className="title">Upcoming Drawing</h2>
        <>
          {drawing.map((el: any, index: number) => {
            {
              if (el.attributes.event.data != null) {
                // response date
                const date = el.attributes.event.data.attributes.date

                // get the date 48h before
                // the count down is going to use this date to stop the lottery
                const dateBeforeCurrent = before48Hours(new Date(date))
                // get the remaning time based on 48h before of the event date
                const totalTime = getTime(
                  new Date(dateBeforeCurrent),
                  new Date()
                )
                /* validate if the lotery time havent end 
                and the lotery is in less than 5 days */
                if (totalTime.minutes > 0 && totalTime.minutes < 7200) {
                  const image = el.attributes.preview_image_url
                  const namePass = el.attributes.collection_name
                  const price = el.attributes.initial_price
                  const shoWLocation =
                    el.attributes.event.data.attributes.venue_name

                  const month = new Date(date).toLocaleString("default", {
                    month: "long",
                  })
                  const day = new Date(date).toLocaleString("default", {
                    day: "2-digit",
                  })
                  const passesAmount = el.attributes.collection_size
                  const winnersAmount = el.attributes.winners

                  return (
                    <BoxDrawing key={"up-drawing" + index}>
                      <DrawRow>
                        <div className="column1">
                          <div className="main-cont">
                            <div className="img-container">
                              <img src={image} alt="dropPic" />
                            </div>
                            <div className="info">
                              <h3>{namePass}</h3>
                              <div>
                                <p>Floor price: {price} eth</p>
                              </div>
                            </div>
                          </div>
                          <div className="cols-cont">
                            <div className="column2">
                              <div className="time">
                                <Countdown targetDate={dateBeforeCurrent} />
                              </div>
                              <div className="place">{shoWLocation}</div>
                              <div className="date">{month + " " + day}</div>
                            </div>
                            <div className="column3">
                              <div>
                                <span>Chance of winning</span>
                                <p>%{(passesAmount / winnersAmount) * 100}</p>
                              </div>
                              <CommonPill className="clickable small active light-grey btn-fill">
                                Enter Lottery
                              </CommonPill>
                              {/* <button type="button" className="variant">
                      Enter Lottery
                    </button> */}
                            </div>
                          </div>
                        </div>
                      </DrawRow>
                    </BoxDrawing>
                  )
                }
              }
            }
          })}
        </>
      </div>
    </UpcomingDrawingStyles>
  )
}

export default Artist
function userState(): [any, any] {
  throw new Error("Function not implemented.")
}
