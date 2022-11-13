import { useState, useEffect } from "react"
import Head from "next/head"

import AppLayout from "components/AppLayout"
import Button from "components/Button"
import GitHubIcon from "components/Icons/GitHub"
import Avatar from "components/Avatar"

import { colors } from "styles/theme"

import { loginWithGitHub, onUserStateChanged } from "../firebase/client"

export default function Home() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    onUserStateChanged(setUser)
  }, [])

  const handleClick = () => {
    loginWithGitHub()
      .then((user) => {
        setUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Head>
        <title>Nexter </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/cubo-logo.png" alt="logo" />
          <h1>Nexter</h1>
          <h2>
            Talk about development <br /> with developers
          </h2>
          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHubIcon fill="#fff" width={32} height={32} />
                Login with GitHub
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <Avatar
                  src={user.avatar}
                  alt="user photo"
                  text={user.userName}
                />
              </div>
            )}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        section {
          height: 100%;
          display: grid;
          place-content: center;
          place-items: center;
        }

        img {
          width: 120px;
        }

        div {
          margin-top: 16px;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
