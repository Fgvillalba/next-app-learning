import css from "styled-jsx/css"
import { fonts, colors, breakpoints } from "../../styles/theme"
import { addOpacityToColor } from "../../styles/utils"

const backgroundColor = addOpacityToColor(colors.primary, 0.3)

export const globalStyles = css.global`
  html,
  body {
    background-image: radial-gradient(${backgroundColor} 1px, #f8fffd 1px),
      radial-gradient(${backgroundColor} 1px, #f2fffb 1px);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
    padding: 0;
    margin: 0;
    overflow: hidden;
    font-family: ${fonts.base};
  }

  * {
    box-sizing: border-box;
  }

  textarea,
  input {
    font-family: ${fonts.base};
  }
`

export default css`
  div {
    display: grid;
    place-items: center;
    height: 100vh;
  }

  main {
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;
    box-shadow: 0 10px 25px rgba(187, 180, 193, 0.8);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  main::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${breakpoints.mobile}) {
    main {
      width: ${breakpoints.mobile};
      height: 90%;
    }
  }
`
