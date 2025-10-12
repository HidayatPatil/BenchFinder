import styles from "../styles/components/BenchPhotos.module.css";
import { FiPlus } from "react-icons/fi";

export default function BenchPhotos() {
  return (
    <div className={styles.bench_photos}>
      <div className={styles.photos_heading}>
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
