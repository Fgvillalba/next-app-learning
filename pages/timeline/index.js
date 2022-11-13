import Link from 'next/link'
import AppLayout from '../../components/AppLayout'

export default function Timeline({userName}) {
    return (
    <>  
        <AppLayout>
        <h1>This is the timeline of {userName}</h1>
        <nav>
            <Link href='/'>
                <a>
                    go home
                </a>
            </Link>
        </nav>
        </AppLayout>
        <style jsx>{`
            h1 {
                font-size: 36px;
                color: #09f;
                text-align: center;
            }

            a {
                color: #DB00DB;
            }

            nav {
                text-align: center;
            }
        `}</style>
    </>    
    )
}   


//getInitialProps, solo sirve para componentes PAGES
Timeline.getInitialProps = () => {
    return fetch('http://localhost:3000/api/hello')
        .then(res => {
            console.log(res)
            return res.json()
        })
}

// Timeline.getInitialProps = () => {
//     return fetch('http://localhost:3000/api/hello')
//         .then(res => {
//             console.log(res)
//             return res.json()
//         })
//         .then(response => {
//             console.log(response)
//             const {userName} = response
//             return {userName}
//         })
// }
