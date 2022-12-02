import LotteryRow from "@/components/Common/LotteryRow"

import { LotteryWinnersStyles } from "./LotteryWinnersStyles"

const LotteryWinners = ({ nfts }: any) => {
  return (
    <LotteryWinnersStyles>
      <div className="content">
        <h2 className="title">Recent Lottery Winners</h2>
        <div className="rows">
          {nfts.map((item: any, index: number) => (
            <LotteryRow
              key={"lottery-row" + index}
              nft={item}
              color={index % 2 == 1 ? "pink" : ""}
            />
          ))}
        </div>
      </div>
    </LotteryWinnersStyles>
  )
}

export default LotteryWinners
