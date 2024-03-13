import Sidebar from '../components/SideBar'
import {ProjectCard} from '../components/ProjectCard'
import styles from './page.module.css';
export default function Home() {
  return (
    <div className={styles.whole}>

      <div className={styles.sidebar}><Sidebar /></div>
      <div className={styles.projectcard}><ProjectCard /></div>
    </div>
  )
}
