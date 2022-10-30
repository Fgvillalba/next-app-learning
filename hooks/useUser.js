import Router from "next/router"
import { useState, useEffect } from "react"

import { onUserStateChanged } from "../firebase/client"

export const USER_STATES = {
  UNKNOW: undefined,
  NOT_LOGGED: null,
}

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.UNKNOW)

  useEffect(() => {
    onUserStateChanged(setUser)
  }, [])

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && Router.push("/")
  }, [user])

  return user
}
