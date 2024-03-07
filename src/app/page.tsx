import styles from "./page.module.css";
import Image from "../../node_modules/next/image";
import vector from "./images/vector.png";
import Link from "../../node_modules/next/link";
import "./globals.css";
import { Stack } from "@mantine/core";
import Header from "./header";


export default function Home() {
    return (
        <Stack>
            <Header />
            <main>
                <div className={styles.mainn}>
                    <div>
                        <div className={styles.map}><Image src={vector} alt="map" width={550} height={550} /></div>
                    </div>
                    <div className={styles.mainbox}>
                        <div className={styles.tagline1}><h6 className={styles.connect}>Connect everything.</h6></div>
                        <div className={styles.tagline}>
                            <h6 className={styles.build}>Build</h6>
                            <h6 className={styles.anything}>anything.</h6>
                        </div>

                        <div><button className={styles.b1}><Link href="/page1">get started</Link></button></div>
                        <form>
                            <input type="text" name="name" placeholder="Paste repo link here.." className={styles.inputbox} />
                            <button type="submit">GO</button>
                        </form>
                    </div>
                </div>
            </main>
        </Stack>
    );
}
