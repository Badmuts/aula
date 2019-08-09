import Link from 'next/link'
import Layout from './Layout'
import Header from './Header'
import Footer from './Footer'

function Page({ user, children }) {
    return (
        <>
            <Layout>
                <Header user={user} />
                {children}
                <Footer>
                    <p>Aula &copy; 2019</p>
                    <nav>
                        <Link href="/support"><a>Support</a></Link>
                    </nav>
                </Footer>
            </Layout>
        </>
    )
}

export default Page
