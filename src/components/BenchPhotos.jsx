import styles from "../styles/components/BenchPhotos.module.css";
import { FiPlus } from "react-icons/fi";

export default function BenchPhotos({ showHeading = true }) {
  return (
    <div className={styles.bench_photos}>
      <div className={`${styles.photos_heading} ${!showHeading ? styles.photos_heading_hidden : ''}`}>
        <h3>Photos</h3>
        <FiPlus className={styles.option_icons}/>
      </div>
      <div className={styles.photos_gallery}>
        <div className={styles.gallery_image}></div>
        <div className={styles.gallery_image}></div>
        <div className={styles.gallery_image}></div>
        <div className={styles.gallery_image}></div>
      </div>
    </div>
  );
}
