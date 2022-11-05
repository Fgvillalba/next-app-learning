import { useState } from "react"

import Router from "next/router"
import Head from "next/head"

import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"

import { addNeuit } from "../../../firebase/client"

const COMPOSE_STATES = {
  USER_UNKNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeNeuit() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_UNKNOW)
  const user = useUser()

  const handleMessageChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addNeuit({
      avatar: user.avatar,
      content: message,
      userId: user.id,
      userName: user.userName,
    })
      .then(() => {
        Router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isNuitButtonDisabled =
    !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear un Neuit </title>
      </Head>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleMessageChange}
            value={message}
            placeholder="¿Qué esta pasando?"
          />
          <div>
            <Button disabled={isNuitButtonDisabled}>Neuitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        textarea {
          width: 100%;
          font-size: 18px;
          padding: 15px;
          border: 0;
          resize: none;
          outline: 0;
          min-height: 200px;
        }
        div {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
