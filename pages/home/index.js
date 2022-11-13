import { useEffect, useState } from "react"

import Link from "next/link"
import Head from "next/head"

import { colors } from "styles/theme"
import { addOpacityToColor } from "styles/utils"

import { fetchLatestNeuits } from "../../firebase/client"
import useUser from "hooks/useUser"

import Avatar from "components/Avatar"
import Neuit from "components/Neuit"
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
      <Head>
        <title>Inicio / Nexter </title>
      </Head>
      <header>
        {user && (
          <Avatar
            resizeAvatar
            alt={user.userName}
            src={user.avatar}
            text="Inicio"
          />
        )}
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
              img={neuit.img}
              id={neuit.id}
            />
          )
        })}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <HomeIcon height={32} width={32} stroke={colors.secondary} />
          </a>
        </Link>
        <Link href="/compose/neuit">
          <a>
            <Search height={32} width={32} stroke={colors.secondary} />
          </a>
        </Link>
        <Link href="/compose/neuit">
          <a>
            <Create height={32} width={32} stroke={colors.secondary} />
          </a>
        </Link>
      </nav>
      <style jsx>{`
        header {
          background: #ffffffcc;
          backdrop-filter: blur(7px);
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          border-bottom: 1px solid #ddd;
          height: 49px;
          width: 100%;
          padding-left: 12px;
          padding-top: 5px;
          padding-bottom: 5px;
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
          background: #ffffffcc;
          backdrop-filter: blur(7px);
          padding-top: 5px;
          padding-bottom: 5px;
        }

        nav a {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          height: 100%;
        }

        nav a:hover {
          background: radial-gradient(
            ${addOpacityToColor(colors.primary, 0.12)} 15%,
            transparent 16%
          );
          background-size: 150px 150px;
          background-position: center;
        }

        nav a:hover > :global(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
