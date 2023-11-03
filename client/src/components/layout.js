import Navbar from './navbar'
import '../styles/layout.css'
const Layout = ({children})=>{
    return(
        <section className='section-layout'>
            <Navbar />
            <article className='container-body'>
                {children}
            </article>
        </section>
    )
}
export default Layout