import React, { useEffect, useState } from 'react';
import styles from "../styles/NavbarNew.module.css";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';




const NavbarNew = () => {

    const [navOpen, setNavOpen] = useState(false);
    const quantity = useSelector((state) => state.cart.quantity);

    const router = useRouter();

    const toggleNav = ( ) => {
        setNavOpen(!navOpen);
        console.log(router.pathname)
    };

    // useEffect(() => {
    //     if (navOpen) document.body.style.overflow = 'hidden';
    //     else document.body.style.overflow = 'visible';
    // }, [navOpen]);

    const navLinks = [
        { name: "Home", 
        path: "/" 
        },
        {
        name: "Products",
        path: "/products",
        },
        {
        name: "Menu",
        path: "/menu",
        },
        {
        name: "Events",
        path: "/events",
        },
        {
        name: "Blog",
        path: "/blog",
        },
    ];
    
    return (
        <div className={styles.container}>
            <div className={styles.nav}>
                <div className={styles.logo}>
                    <Link href="/" passHref>
                        <Image src="/img/Logo1.png" alt="Logo" width="70px" height="50px" />
                    </Link>
                </div>

                <div className={`${styles.hamburger} ${navOpen ? `${styles.toggle}` : ""}`} onClick={toggleNav}>
                    <div className={styles.line1}></div>
                    <div className={styles.line2}></div>
                    <div className={styles.line3}></div>
                </div>
                <ul className={`${styles.navLinks} ${navOpen ? `${styles.open}` : ""}`}>
                    {
                        navLinks.map((link, index) => (
                            <li key={index} className={`${navOpen ? `${styles.fade}` : ""}`}>
                                <Link href={link.path}>
                                    <a className={`${router.pathname == link.path ? `${styles.active}` : "" }`} onClick={toggleNav}>{link.name}</a>
                                </Link>
                            </li>
                        ))
                    }
                    <li className={`${navOpen ? `${styles.fade}` : ""}`}><button className={styles.loginButton} href="#">Login</button></li>
                    <li className={`${navOpen ? `${styles.fade}` : ""}`}>
                        <Link href="/cart" passHref>
                            <a onClick={toggleNav} className={styles.item}>
                                <div className={styles.cart}>
                                    <Image src="/img/cart.png" alt="" width="30px" height="30px" />
                                    <div className={styles.counter}>{quantity}</div>
                                </div>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarNew