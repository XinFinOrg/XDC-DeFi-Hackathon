import Navbar from '../fragments/navbar'
// import Footer from './footer'
import styles from '../styles/layout.module.css'
export default function Layout({ children }: { children: any }) {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.main}>
                <main>{children}</main>
                {/* <Footer /> */}
            </div>
        </div>
    )
}