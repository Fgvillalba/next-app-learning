import { DEFAULT_LANGUAGE } from "constants/locale"

const isdateTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.DateTimeFormat

export const formatDate = (timestamp, lenguage) => {
  const date = new Date(timestamp)

  if (!isdateTimeFormatSupported) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return date.toLocaleDateString(lenguage, options)
  }

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }

  return new Intl.DateTimeFormat(lenguage, options).format(date)
}
export default function useDateTimeFormater(timestamp) {
  return formatDate(timestamp, DEFAULT_LANGUAGE)
}
