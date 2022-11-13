import { fireStore } from "../../../firebase/admin"

export default (req, res) => {
  const { query } = req
  const { id } = query

  fireStore
    .collection("neuits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const createdAt = data.createdAt
      res.json({ ...data, id, createdAt: +createdAt.toDate() })
    })
    .catch(() => {
      res.status(404).end()
    })
}
