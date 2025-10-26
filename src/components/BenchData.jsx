import styles from "../styles/components/BenchData.module.css";
import Tags from "./Tags";
import { FiEdit3 } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";

export default function BenchData({showOptions = true, name, location, tags = []}) {
  return (
    <div className={styles.data_metadata}>
      <div className={styles.metadata_name_options}>
        <h2>{name || "Unnamed Bench"}</h2>
        <div className={`${styles.bench_metadata_options} ${!showOptions ? styles.bench_metadata_no_options : ''}`}>
          {showOptions && (
            <>
              <FiEdit3 className={styles.option_icons} />
              <FiExternalLink className={styles.option_icons} />
              <FiTrash2 className={styles.option_icons} />
            </>
          )}
        </div>
      </div>
      <div className={styles.metadata_tags_rating}>
        <div className={styles.bench_tags}>
          {tags.map((tag, index) => (
            <Tags key={index} tagName={tag} />
          ))}
        </div>
        <div className={styles.bench_distance}>
          <FiMapPin className={styles.distance_icon} />
          <p>1.2 km</p>
        </div>
      </div>
      <p className={styles.metadata_address}>
        {location || "Location not available"}
      </p>
    </div>
  );
}
