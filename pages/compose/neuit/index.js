import AppLayout from "components/AppLayout"
import Button from "components/Button"
// import useUser from "hooks/useUser"

export default function ComposeNeuit() {
  // const user = useUser()

  return (
    <>
      <AppLayout>
        <form>
          <textarea placeholder="¿Qué esta pasando?"></textarea>
          <div>
            <Button>Neuitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        textarea {
          width: 100%;
          font-size: 18px;
          padding: 15px;
          border: 0;
          resize: none;
          outline: 0;
          min-height: 200px;
        }
        div {
          padding: 15px;
        }
      `}</style>
    </>
  )
}
