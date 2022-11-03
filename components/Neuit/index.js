import Avatar from "components/Avatar"

export default function Neuit({
  avatar,
  userName,
  content,
  id,
  userId,
  createdAt,
}) {
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
            <date>{createdAt}</date>
          </header>
          <p>{content}</p>
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
