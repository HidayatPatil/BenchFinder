import styles from "../styles/components/DrawerBody.module.css";

export default function DrawerBody({ children }) {
  return (
    <div className={styles.drawer_container}>
        {children}
    </div>
  ) 
}
