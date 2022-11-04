import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"
import Neuit from "components/Neuit"
import { fetchLatestNeuits } from "../../firebase/client"
import useUser from "hooks/useUser"

import { useEffect, useState } from "react"

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
          <h3>NAV</h3>
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

        nav {
          position: sticky;
          bottom: 0;
          display: flex;
          align-items: center;
          border-top: 1px solid #ddd;
          height: 49px;
          width: 100%;
          background: #fff;
        }
      `}</style>
    </>
  )
}
