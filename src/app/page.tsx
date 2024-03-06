import styles from "./page.module.css";
import Image from "../../node_modules/next/image";
import vector from "./images/vector.png";
import logoo from "./images/logoo.png";
import navbar from "./navbar";

export default function Home() {
  return (
   <main>
    <div className={styles.mainn}>
      <div className={styles.nav}><div className={styles.logooo}><Image src={logoo}/></div>
      <div className={styles.navinner}>
      <p>Home</p>
      <p>Start Building</p>
      <p>About us</p>
      <p>Contact</p>
      <button className={styles.b1}>Login</button>
      </div>
      </div>
      <div>
        <div className={styles.map}><Image src={vector} alt="map" width={550} height={550}/></div>
      </div>
      <div className={styles.mainbox}>
        <div className={styles.tagline1}><h6 className={styles.connect}>Connect everything.</h6></div>
        <div className={styles.tagline}>
          <h6 className={styles.build}>Build</h6>
          <h6 className={styles.anything}>anything.</h6>
        </div>
        
        <div><button className={styles.b1}>get started</button></div>
      </div>
   </div>
   </main>
  );
}
