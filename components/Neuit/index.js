import Avatar from "components/Avatar"

export default function Neuit({ avatar, username, message, id }) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={username} src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
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
