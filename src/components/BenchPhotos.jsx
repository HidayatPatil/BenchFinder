import styles from "../styles/components/BenchPhotos.module.css";
import { FiPlus } from "react-icons/fi";

export default function BenchPhotos({ showHeading = true, photos = [] }) {
  const displayPhotos = photos.slice(0, 4); // Only show up to 4 photos

  return (
    <div className={styles.bench_photos}>
      <div className={`${styles.photos_heading} ${!showHeading ? styles.photos_heading_hidden : ''}`}>
        <h3>Photos</h3>
        {showHeading && <FiPlus className={styles.option_icons}/>}
      </div>
      <div className={styles.photos_gallery}>
        {displayPhotos.length > 0 ? (
          displayPhotos.map((photo, index) => (
            <div key={index} className={styles.gallery_image}>
              <img 
                src={photo} 
                alt={`Bench photo ${index + 1}`}
                className={styles.gallery_photo}
              />
            </div>
          ))
        ) : (
          <div className={styles.gallery_image}></div>
        )}
      </div>
    </div>
  );
}
