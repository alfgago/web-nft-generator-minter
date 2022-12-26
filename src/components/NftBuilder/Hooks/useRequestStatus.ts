import { useEffect, useState } from "react"

import { RequestsClient, RequestStatus } from "@juicelabs/client"

export const useRequestStatus = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus | null>(null)
  const [requestData, setRequestData] = useState<any>(null)
  const [requestId, setRequestId] = useState<string | null>(null)

  useEffect(() => {
    if (!requestId) return

    const requestsClient = new RequestsClient("https://juicelabs.io/api/v1")

    requestsClient.subscribe(requestId, ({ status, ...restOfData }) => {
      setRequestStatus(status)
      setRequestData(restOfData)
    })

    return () => {
      requestsClient.unsubscribe(requestId)
    }
  }, [requestId])

  return { requestStatus, setRequestId, requestData }
}
