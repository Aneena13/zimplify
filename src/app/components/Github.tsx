'use client'
import styles from "../page.module.css";
import Image from "next/image";

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
   <main>
    <div className={styles.mainn}>
        
        <p className={styles.head}>Github Integration</p>
        <div><button type="button" className={styles.b1} onClick={() => router.push('/page1')}>Import from Github</button></div>
        
      </div>
   
   </main>
  );
}
