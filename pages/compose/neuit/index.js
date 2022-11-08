import { useState, useEffect } from "react"

import { getDownloadURL } from "firebase/storage"

import Router from "next/router"
import Head from "next/head"

import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import Avatar from "components/Avatar"

import { addNeuit, uploadImage } from "../../../firebase/client"

const COMPOSE_STATES = {
  USER_UNKNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeNeuit() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_UNKNOW)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then((imgURL) => {
          setImgURL(imgURL)
        })
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imgURL,
    })
      .then(() => {
        Router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isNuitButtonDisabled =
    !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear un Neuit </title>
      </Head>
      <AppLayout>
        <section className="form-container">
          {user && (
            <section className="avatar-container">
              <Avatar src={user.avatar} />
            </section>
          )}
          <form onSubmit={handleSubmit}>
            <textarea
              onChange={handleMessageChange}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              value={message}
              placeholder="¿Qué esta pasando?"
            />
            {imgURL && (
              <section className="remove-img">
                <button onClick={() => setImgURL(null)}>x</button>
                <img src={imgURL} />
              </section>
            )}
            <div>
              <Button disabled={isNuitButtonDisabled}>Neuitear</Button>
            </div>
          </form>
        </section>
      </AppLayout>
      <style jsx>{`
        form {
          padding: 10px;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        .remove-img {
          position: relative;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          width: 32px;
          height: 32px;
          font-size: 18px;
          border: 0;
          border-radius: 999px;
          position: absolute;
          top: 15px;
          left: 15px;
        }

        button:hover {
          background: rgba(0, 0, 0, 0.4);
          cursor: pointer;
        }

        img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }

        textarea {
          width: 100%;
          font-size: 18px;
          font-weight: 400;
          padding: 15px;
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "2px dashed #09f"
            : "0"};
          resize: none;
          outline: 0;
          min-height: 200px;
          border-radius: 10px;
        }

        div {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
