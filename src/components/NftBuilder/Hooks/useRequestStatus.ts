import { useEffect, useState } from "react"

import {
  RequestPoller,
  RequestStatus,
} from "@/utils/SmartContracts/requestPoller"

export const useRequestStatus = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("pending")
  const [requestId, setRequestId] = useState<string | null>(null)

  useEffect(() => {
    if (!requestId) return

    const urlToPoll = `https://juicelabs.io/api/v1/requests/${requestId}`

    // poll on an interval and set the appropriate status
    const poller = new RequestPoller(urlToPoll, ({ status }) =>
      setRequestStatus(status)
    )

    poller.start()

    return () => {
      poller.stop()
    }
  }, [requestId])

  return { requestStatus, setRequestId }
}
