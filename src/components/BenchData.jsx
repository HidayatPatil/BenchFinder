import styles from "../styles/components/BenchData.module.css";
import Tags from "./Tags";
import { FiEdit3 } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";

export default function BenchData({showOptions = true}) {
  return (
    <div className={styles.data_metadata}>
      <div className={styles.metadata_name_options}>
        <h2>Bench Name</h2>
        <div className={`${styles.bench_metadata_options} ${!showOptions ? styles.bench_metadata_no_options : ''}`}>
          {/* <IconContext.Provider value={{ className: styles.option_icons }}> */}
          <FiEdit3 className={styles.option_icons} />
          <FiExternalLink className={styles.option_icons} />
          <FiTrash2 className={styles.option_icons} />
          {/* </IconContext.Provider> */}
        </div>
      </div>
      <div className={styles.metadata_tags_rating}>
        <div className={styles.bench_tags}>
          <Tags tagName={"LakeView"} />
          <Tags tagName={"Quite"} />
          <Tags tagName={"Nature"} />
        </div>
        <div className={styles.bench_distance}>
          <FiMapPin className={styles.distance_icon} />
          <p>1.2 km</p>
        </div>
      </div>
      <p className={styles.metadata_address}>
        3700 Willingdon Avenue, Burnaby, BC, Canada V3R 1M2
      </p>
    </div>
  );
}
