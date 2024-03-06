import styles from "./page.module.css";
import Image from "../../node_modules/next/image";
import vector from "./images/vector.png";



export default function Page1() {
  return (
   <main>
    <div className={styles.mainn}>
      <div>
        <div className={styles.map}><Image src={vector} alt="map" width={550} height={550}/></div>
      </div>
      <form>
        <input type="text" name="name" placeholder="Paste repo link here.." className={styles.inputbox}/>
        <button type="submit">GO</button>
      </form>
   </div>
   </main>
  );
}
