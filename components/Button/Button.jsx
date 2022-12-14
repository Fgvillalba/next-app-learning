import { colors } from "../../styles/theme"

const Button = ({ children, onClick, disabled }) => {
  return (
    <>
      <button disabled={disabled} onClick={onClick}>
        {children}
      </button>
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

        button[disabled] {
          pointer-events: none;
          opacity: 0.2;
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
