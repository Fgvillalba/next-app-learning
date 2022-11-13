import { fireStore } from "../../firebase/admin"

import Neuit from "components/Neuit"
import Spinner from "components/Spinner"

export default function NeuitPage(props) {
  if (!props.id) {
    return (
      <>
        <div>
          <Spinner />
        </div>
        <style jsx>{`
          div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </>
    )
  }

  return (
    <>
      <Neuit {...props} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "tqNB4uNPWnvXE89BH68T" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params
  return fireStore
    .collection("neuits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const createdAt = data.createdAt
      const props = { ...data, id, createdAt: +createdAt.toDate() }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// NeuitPage.getInitialProps = (context) => {
//   const { query, res } = context
//   const { id } = query

//   return fetch(`http://localhost:3000/api/neuits/${id}`).then((apiResponse) => {
//     if (apiResponse.ok) return apiResponse.json()
//     if (res) {
//       res.writeHead(301, { Location: "/home" }).end()
//     }
//   })
// }
