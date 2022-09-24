import Link from 'next/link'
import AppLayout from '../../components/AppLayout'

export default function Timeline() {
    return (
    <>  
        <AppLayout>
        <h1>This is the timeline</h1>
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