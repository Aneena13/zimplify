import styles from "./header.module.css";
import Image from "../../node_modules/next/image";
import logoo from "./images/logoo.png";
export default function Header() {
    return(
        <header>
            <div className={styles.nav}><div className={styles.logooo}><Image src={logoo}/></div>
            <div className={styles.navinner}>
            <p>Home</p>
            <p>Start Building</p>
            <p>About us</p>
            <p>Contact</p>
            <button className={styles.b1}>Login</button>
            </div>
            </div>
        </header>
    );
}