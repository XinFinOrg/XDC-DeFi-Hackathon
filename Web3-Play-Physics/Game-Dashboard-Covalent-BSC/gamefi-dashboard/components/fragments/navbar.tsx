import React, { useEffect, useState } from 'react'
// import  NextFunctionComponent  from 'next'
import { BsGrid3X3GapFill } from 'react-icons/bs';
import { GiSadCrab, GiBoltBomb } from 'react-icons/gi'
import { FaDragon } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from "next/router";


import styles from '../styles/navbar.module.css'
const Navbar = () => {

    // Get Router Objects
    const router = useRouter();
    // Detect width scree
    const [widthSize, setWidthSize] = useState(1440)

    useEffect(() => {
        function handleResize() {
            setWidthSize(window.innerWidth)
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // list menu
    const dataMenu = [
        // {
        //     menu: 'Axie Marketplace',
        //     link: '/axie',
        //     icon: GiAxolotl
        // },
        {
            menu: 'Bombcrypto',
            link: '/bombcrypto',
            icon: GiBoltBomb
        },
        {
            menu: 'Crabada Marketplace',
            link: '/crabada',
            icon: GiSadCrab
        },
        {
            menu: 'Elfin Marketplace',
            link: '/elfin',
            icon: FaDragon
        },

    ]

    return (
        <div className={styles.navbardefault}>
            <div className={styles.listMenu}>
                <div className={styles.badgeMenu}>
                    <BsGrid3X3GapFill />
                </div>
                {dataMenu && dataMenu.map((item, i) => {
                    return (
                        <Link key={i} href={item.link} passHref>
                            <div className={router.pathname == item.link ? styles.linkActive : styles.linkNonActive}>
                                {<item.icon />}
                                {widthSize > 1200 ? item.menu : ''}
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

export default Navbar