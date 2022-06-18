import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";

const Navbar = () => {

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

const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <ul className={styles.list}>
          {
            navLinks.map((link, index) => (
              <li className={styles.listItem} key={index}>
                <Link href={link.path}>
                  <a>{link.name}</a>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
      <Link href="/cart" passHref>
        <a className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Navbar;
