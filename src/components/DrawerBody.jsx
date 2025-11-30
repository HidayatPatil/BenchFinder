import styles from '../styles/components/DetailsDrawer.module.css';

export default function DrawerBody({ children }) {
    return <div className={styles.drawer_container}>{children}</div>;
}
