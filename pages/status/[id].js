import Neuit from "components/Neuit"

export default function NeuitPage(props) {
  console.log(props)
  return (
    <>
      <Neuit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

NeuitPage.getInitialProps = (context) => {
  const { query } = context
  const { id } = query

  return fetch(`http://localhost:3000/api/neuits/${id}`).then((apiResponse) => {
    console.log(apiResponse)
    if (apiResponse.ok) return apiResponse.json()
  })
}
