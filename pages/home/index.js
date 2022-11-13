import AppLayout from "components/AppLayout"
import Neuit from "components/Neuit"

import { useEffect, useState } from "react"

export default function Home() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((neuit) => {
            return (
              <Neuit
                key={neuit.id}
                avatar={neuit.avatar}
                username={neuit.username}
                message={neuit.message}
              />
            )
          })}
        </section>
        <nav></nav>
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
        }

        h2 {
          font-size: 21px;
          font-weight: 700;
          padding-left: 15px;
        }

        nav {
          position: sticky;
          bottom: 0;
          border-top: 1px solid #ddd;
          height: 49px;
          width: 100%;
          background: #fff;
        }
      `}</style>
    </>
  )
}
