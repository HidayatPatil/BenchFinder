import styles from "../styles/components/Tags.module.css";

export default function Tags({tagName}){
    return(
        <div className={styles.tag_container}>
            <p>{tagName}</p>
        </div>
    )
}
