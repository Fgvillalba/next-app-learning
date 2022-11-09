export default function NeuitPage(props) {
  console.log(props)
  return (
    <>
      {props.id}
      <style jsx>{``}</style>
    </>
  )
}

NeuitPage.getInitialProps = (context) => {
  const { query } = context
  const { id } = query

  return fetch(`http://localhost:3000/api/neuits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json()
  })
}
