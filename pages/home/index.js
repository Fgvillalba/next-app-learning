import { useEffect, useState } from "react"

import Link from "next/link"

import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Neuit from "components/Neuit"
import { fetchLatestNeuits } from "../../firebase/client"
import useUser from "hooks/useUser"
import Create from "components/Icons/Create"
import HomeIcon from "components/Icons/Home"
import Search from "components/Icons/Search"

export default function Home() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user &&
      fetchLatestNeuits().then((timeline) => {
        setTimeline(timeline)
      })
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          {user && (
            <Avatar
              resizeAvatar
              alt={user.userName}
              src={user.avatar}
              text="Inicio"
            />
          )}
          {/* <h2>Inicio</h2> */}
        </header>
        <section>
          {timeline.map((neuit) => {
            return (
              <Neuit
                key={neuit.id}
                avatar={neuit.avatar}
                userName={neuit.userName}
                content={neuit.content}
                userId={neuit.userId}
                createdAt={neuit.createdAt}
              />
            )
          })}
        </section>
        <nav>
          <Link href="/home">
            <a>
              <HomeIcon height={32} width={32} stroke="#09F" />
            </a>
          </Link>
          <Link href="/compose/neuit">
            <a>
              <Search height={32} width={32} stroke="#09F" />
            </a>
          </Link>
          <Link href="/compose/neuit">
            <a>
              <Create height={32} width={32} stroke="#09F" />
            </a>
          </Link>
        </nav>
      </AppLayout>
      <style jsx>{`
        header {
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          border-bottom: 1px solid #ddd;
          height: 49px;
          width: 100%;
          padding-left: 12px;
        }

        h2 {
          font-size: 21px;
          font-weight: 700;
          padding-left: 15px;
        }

        section {
          flex: 1;
        }

        nav {
          position: sticky;
          bottom: 0;
          display: flex;
          border-top: 1px solid #ddd;
          height: 49px;
          width: 100%;
          background: #fff;
        }

        nav a {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          height: 100%;
        }

         {
          /* nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%)
          background-size: 180px 180px; 
          background-position: center;
        } */
        }
      `}</style>
    </>
  )
}
