
import Github from '../components/Github';
import SideBar from '../components/SideBar';
import styles from './page.module.css'
// import Image from 'next/image';
// import vector from '../images/vector.png';
export default function Deploy() {
  return (
    
    <div className={styles.whole}>
      {/* <Image classname={styles.img} src={vector} fill={true} /> */}
        <div><SideBar /></div>
        <div><Github /></div>
        
    </div>
  )
}
