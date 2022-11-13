import AppLayout from "components/AppLayout"
import Avatar from "components/Avatar"

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
          {timeline.map((devit) => {
            return (
              <article key={devit.id}>
                <Avatar alt={devit.username} src={devit.avatar} />
              </article>
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>{`
        header {
          display: flex;
          align-items: center;
          position: fixed;
          top: 0;
          border-bottom: 1px solid #ccc;
          height: 49px;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
        }

        section {
          padding-top: 100px;
          display: block;
        }

        nav {
          position: fixed;
          bottom: 0;
          border-top: 1px solid #ccc;
          height: 49px;
          width: 100%;
        }
      `}</style>
    </>
  )
}
