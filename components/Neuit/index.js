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
            {/* <date>{createdAt}</date> */}
          </header>
          <p>{content}</p>
        </section>
      </article>

      <style jsx>{`
        article {
          display: flex;
          padding: 10px 15px;
          border-bottom: 2px solid #eee;
        }

        div {
          padding-right: 10px;
        }

        p {
          margin: 0;
          line-height: 1.3125;
        }
      `}</style>
    </>
  )
}
