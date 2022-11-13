import { useState } from "react"

import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { addNeuit } from "../../../firebase/client"

export default function ComposeNeuit() {
  const user = useUser()
  const [message, setMessage] = useState("")

  const handleMessageChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addNeuit({
      avatar: user.avatar,
      content: message,
      userId: user.id,
      userName: user.userName,
    })
  }

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleMessageChange}
            value={message}
            placeholder="¿Qué esta pasando?"
          />
          <div>
            <Button disabled={!message.length}>Neuitear</Button>
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
