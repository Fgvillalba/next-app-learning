import Avatar from "components/Avatar"

import Link from "next/link"

import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormater from "hooks/useDateTimeFormater"

export default function Neuit({
  avatar,
  userName,
  content,
  id,
  userId,
  createdAt,
  img,
}) {
  const timeAgo = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormater(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>·</span>
            <Link href={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeAgo}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>

      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 1px solid #ddd;
        }

        div {
          padding-right: 10px;
        }

        img {
          margin-top: 10px;
          height: auto;
          width: 100%;
          border-radius: 10px;
        }

        a {
          font-size: 14px;
          color: #555;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        p {
          margin: 0;
          line-height: 1.3125;
        }

        span {
          margin: 0 5px;
        }
      `}</style>
    </>
  )
}
