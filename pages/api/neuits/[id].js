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
      res.json(data)
    })
    .catch(() => {
      res.status(404).end()
    })
}
