import styles from "../styles/components/FAB.module.css"
import { FiPlus } from "react-icons/fi";
import { Link } from 'react-router-dom'

export default function FAB(){
    return(
        <Link to="/add" className={styles.fab_container}>
            <FiPlus className={styles.option_icons}/>
        </Link>
    )
}