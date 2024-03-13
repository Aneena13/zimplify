'use client'
import styles from "../page.module.css";
import Image from "next/image";
import image1 from '../images/githubimg.png';
import image2 from '../images/gitlabimg.png';
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
   <main>
    <div className={styles.mainn}>
        <div className={styles.all}>
        <div className={styles.one}>
        <div className={styles.bar}></div>
        <p className={styles.head}>1. Connect to Git Provider</p>
        </div>
        <div className={styles.two}>
        <div className={styles.bartwo}></div>
        <p className={styles.headtwo}>2. Select Repository</p>
        </div>
        <div className={styles.three}>
        <div className={styles.barthree}></div>
        <p className={styles.headthree}>3. Configure Site and Deploy</p>
        </div>
        </div>
        <p className={styles.caption}>Let's deploy your project...</p>

        <div className={styles.boxes}>
        <div className={styles.b2box}>
        <div className={styles.b2wrap}>
        <div className={styles.b2img}><Image src={image1} alt="imagel"/></div>
        <p className={styles.b2head}>Deploy with GitHub</p>
        </div>
        <div><button type="button" className={styles.b2} onClick={() => router.push('/page1')}>Login into GitHub</button></div>
        </div>

        <div className={styles.b3box}>
        <div className={styles.b3wrap}>
        <div className={styles.b3img}><Image src={image2} alt="imagel"/></div>
        <p className={styles.b3head}>Deploy with GitLab</p>
        </div>
        <div><button type="button" className={styles.b3} onClick={() => router.push('/page1')}>Login into GitLab</button></div>
        </div>
        </div>

      </div>
   
   </main>
  );
}
