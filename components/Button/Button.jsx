import { colors } from "../../styles/theme"

const Button = ({ children, onClick }) => {
  const a = "asdsa"
  return (
    <>
      <button onClick={onClick}>{children}</button>
      <style jsx>{`
        button {
          background: ${colors.black};
          color: ${colors.white};
          border: 0;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          font-weight: 800;
          padding: 4px 24px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        button > :global(svg) {
          margin-right: 8px;
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </>
  )
}

export default Button
