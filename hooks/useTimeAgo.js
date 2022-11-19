import { useState, useEffect } from "react"
import { formatDate } from "./useDateTimeFormater"

const isdateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat

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
  const [timeAgo, setTimeAgo] = useState(() => getDateDif(timestamp)) // si pasamos la ejecucion de la funcion getDateDif se ejecutaria siempre que el componente se renderize, de esta manera l o hace solo una vez

  useEffect(() => {
    if (isdateTimeFormatSupported) {
      const interval = setInterval(() => {
        console.log("interval")
        const newTimeAgo = getDateDif(timestamp)
        setTimeAgo(newTimeAgo)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [])

  if (!isdateTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" })
  const { value, unit } = timeAgo
  return rtf.format(value, unit)
}
