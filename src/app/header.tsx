import Image from "next/image";
import styles from "./header.module.css";
import logoo from "./images/logoo.png";
export default function Header() {
    return(
        <header>
            <div className={styles.nav}><div className={styles.logooo}><Image src={logoo} alt="imagel"/></div>
            <div className={styles.navinner}>
            <p>Home</p>
            <p>Start Building</p>
            <p>About us</p>
            <p>Contact</p>
            
            </div>
            </div>
        </header>
    );
}