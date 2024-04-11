'use client'
import styles from "./page.module.css";
import Image from "next/image";
import vector from "./images/vector.png";
import "./globals.css";
import { Button, Stack } from "@mantine/core";
import Header from "./header";
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
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
              <Button
                onClick={() => router.push('/sign-in')}
                size={'lg'}
              >
                Get Started
              </Button>
          </div>
        </div>
      </main>
    </Stack>
  );
}
