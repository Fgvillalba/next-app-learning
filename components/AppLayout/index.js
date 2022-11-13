import { fonts, colors } from '../../styles/theme'
import { addOpacityToColor } from '../../styles/utils'
import { breakpoints } from '../../styles/theme';

const backgroundColor = addOpacityToColor(colors.primary, 0.3);

export default function AppLayout({ children }) {
    return (
      <>
        <div>
          <main>
                {children}
          </main>
        </div>
        <style jsx>{`
          div {
            display: grid;
            place-items: center;
            height: 100vh;
          }

          main {
            background: #fff;
            box-shadow: 0 10px 25px rgba(0, 0, 0, .2);
            border-radius: 10px;
            width: 100%;
            height: 100%;
          }

          @media (min-width: ${breakpoints.mobile}){
            main {
              width: ${breakpoints.mobile};
              height: 90vh;
            }
          }
          

        `}</style>
        <style jsx global>{`
        html,
        body {
          background-image:
            radial-gradient(${backgroundColor} 1px, transparent 1px),
            radial-gradient(${backgroundColor} 1px, transparent 1px);
          background-position: 0 0, 25px 25px;
          background-size: 50px 50px;
          padding: 0;
          margin: 0;
          font-family: ${fonts.base};
        }
        
        a {
          color: inherit;
          text-decoration: none;
        }
        
        * {
          box-sizing: border-box;
        }
        
        @media (prefers-color-scheme: dark) {
          html {
            color-scheme: dark;
          }
          body {
            color: white;
            background: black;
          }
        }
        `}</style>
        </>
    )
}