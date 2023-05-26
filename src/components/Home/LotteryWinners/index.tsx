import { useEffect, useState } from "react"
import axios from "axios"

import { CommonPill } from "@/components/Common/CommonStyles"
import LotteryRow from "@/components/Common/LotteryRow"

import { LotteryWinnersStyles } from "./LotteryWinnersStyles"

const LotteryWinners = ({ title }: any) => {
  // Declare the state variables and setter function
  const [winners, setWinners] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  async function fetchNext() {
    try {
      const { data } = await axios.get("/api/airdrops/winners", {
        params: {
          page: page,
        },
      })
      // Update the state with the response data
      setWinners(winners.concat(data.data))
      setPageCount(data.meta.pagination.pageCount)
      setLoading(false)
    } catch (err: any) {
      // Update the state with the error
      setError(err)
      setLoading(false)
    }
  }

  // Fetch the data in the useEffect hook
  useEffect(() => {
    setLoading(true)
    fetchNext()
  }, [page])

  return (
    <LotteryWinnersStyles>
      <div className="content">
        <h2 className="title">{title}</h2>
        <div className="rows">
          {winners.map((item: any, index: number) => (
            <LotteryRow
              key={"lottery-row" + index}
              drop={item}
              color={index % 2 == 1 ? "pink" : ""}
            />
          ))}
        </div>
        {page < pageCount ? (
          <div className="loadmore">
            <span onClick={() => setPage(page + 1)}>
              <CommonPill className="clickable small">See More</CommonPill>
            </span>
            {loading && <p className="message">Loading...</p>}
            {error && <p className="message">Error: {error.message}</p>}
          </div>
        ) : (
          ""
        )}
      </div>
    </LotteryWinnersStyles>
  )
}

export default LotteryWinners
