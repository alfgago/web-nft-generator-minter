import { useEffect, useState } from "react"

type CountdownProps = {
  targetDate: string | Date
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = new Date(targetDate).getTime() - new Date().getTime()
      setTimeRemaining(Math.max(remaining, 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60)
  const seconds = Math.floor((timeRemaining / 1000) % 60)

  return (
    <>
      {timeRemaining > 0 ? (
        <div>
          <p>
            {days} d {hours} hrs {minutes} min {seconds} sec{" "}
          </p>
        </div>
      ) : (
        <div>The countdown has ended!</div>
      )}
    </>
  )
}

export default Countdown
