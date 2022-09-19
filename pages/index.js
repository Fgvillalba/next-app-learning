import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nexter </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
         <a href="https://nextjs.org">Nexter</a>
        </h1>
        <nav className='nav'>
          <Link href='/timeline'>
             <a>
             timeline
             </a>
          </Link>
        </nav>
      </main>

      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 48px;
        }

        a {
          color: #09f;
          text-decoration: none; 
        }

        nav {
          font-size: 24px;
          text-align: center;
        }
      
      `}</style>
    </div>
  )
}
