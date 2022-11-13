import { DEFAULT_LANGUAGE } from "constants/locale"

export default function useDateTimeFormater(timestamp) {
  const date = new Date(timestamp)
  const lenguage = DEFAULT_LANGUAGE
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
