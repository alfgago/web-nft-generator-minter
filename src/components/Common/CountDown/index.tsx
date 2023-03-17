import { useEffect, useState } from "react"

type CountdownProps = {
  targetDate: string | Date
  triggerAction: any
}

const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  triggerAction = false,
}) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(0.1)

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

  useEffect(() => {
    if (timeRemaining <= 0) {
      // Perform the action you want here
      if (triggerAction != false) {
        triggerAction()
      }
    }
  }, [timeRemaining])

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
