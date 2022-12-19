// Smart contract can take a while to deploy, so we need to poll for the result
// here is a helper class that will poll for the result of a deployment

export type RequestStatus = "pending" | "succeeded" | "failed"

export class RequestPoller {
  private intervalMs: number
  private timeoutMs: number
  private url: string
  private callback: (data: any) => void
  private intervalTimer: NodeJS.Timeout | null
  private timeoutTimer: NodeJS.Timeout | null

  constructor(
    url: string,
    callback: (data: { status: RequestStatus }) => void,
    intervalMs: number = 1000,
    timeoutMs: number = 5 * 60 * 1000 // 5 minutes
  ) {
    this.url = url
    this.callback = callback
    this.intervalMs = intervalMs
    this.timeoutMs = timeoutMs

    this.intervalTimer = null
    this.timeoutTimer = null
  }

  public start() {
    this.intervalTimer = setInterval(async () => {
      const response = await fetch(this.url)
      const data = await response.json()

      this.callback(data)

      if (data.status !== "pending") {
        this.stop()
      }
    }, this.intervalMs)

    setTimeout(() => {
      this.callback({ status: "failed", reason: "timeout" })
      this.stop()
    }, this.timeoutMs)
  }

  // clean up all side effects
  public stop() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer)
    }

    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer)
    }
  }
}
