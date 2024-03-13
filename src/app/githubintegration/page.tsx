
import Github from '../components/Github';
import SideBar from '../components/SideBar';
import styles from './page.module.css'
export default function Githubintegration() {
  return (
    <div className={styles.whole}>
        <div><SideBar /></div>
        <div><Github /></div>
     
    </div>
  )
}
