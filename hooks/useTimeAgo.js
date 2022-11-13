import { useState, useEffect } from "react"

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDif = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000 // /1000  to discard miliseconds

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.round(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDif(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDif(timestamp)
      setTimeAgo(newTimeAgo)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" })
  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
