import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.card}>
          <h1 className={styles.title}>Company</h1>
          <ul>
            <li>About US</li>
            <li>Team</li>
            <li>Career</li>

          </ul>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Contact</h1>
          <ul>
            <li>Help & Support</li>
            <li>Partner with US</li>
            <li>Ride with US</li>
            
          </ul>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            Lorem, ipsum.
            <br /> Mumbai, 900001
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            Lorem, ipsum dolor.
            <br /> Mumbai, 900001
            <br /> (602) 867-1011
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
