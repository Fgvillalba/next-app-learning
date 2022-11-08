import Avatar from "components/Avatar"

import useTimeAgo from "hooks/useTimeAgo"

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
            <date>{timeAgo}</date>
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

        date {
          font-size: 14px;
          color: #555;
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
