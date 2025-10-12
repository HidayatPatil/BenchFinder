import styles from "../styles/components/DrawerBody.module.css"
import { useState } from "react"

export default function DrawerBody({children}){
    const [isOpen, setIsOpen] = useState(true);

    return(
        <div className={`${styles.drawer_container} ${!isOpen ? styles.drawer_collapsed : ""}`}>
            <div className={styles.drawer_handle} onClick={() => setIsOpen(!isOpen)}></div>
            {children}
        </div>
        
    )
}