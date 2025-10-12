import styles from "../styles/components/BenchData.module.css";
import Tags from "./Tags";
import { FiHeart } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { FiBookmark } from "react-icons/fi";
import { FiStar } from "react-icons/fi";

export default function BenchData() {
  return (
    <div className={styles.data_metadata}>
      <div className={styles.metadata_name_options}>
        <h2>Bench Name</h2>
        <div className={styles.bench_metadata_options}>
          {/* <IconContext.Provider value={{ className: styles.option_icons }}> */}
          <FiHeart className={styles.option_icons} />
          <FiExternalLink className={styles.option_icons} />
          <FiBookmark className={styles.option_icons} />
          {/* </IconContext.Provider> */}
        </div>
      </div>
      <div className={styles.metadata_tags_rating}>
        <div className={styles.bench_tags}>
          <Tags tagName={"LakeView"} />
          <Tags tagName={"Quite"} />
          <Tags tagName={"Nature"} />
        </div>
        <div className={styles.bench_rating}>
          <p>4.5</p>
          <FiStar className={styles.rating_icon}/>
        </div>
      </div>
      <p className={styles.metadata_address}>
        3700 Willingdon Avenue, Burnaby, BC, Canada V3R 1M2
      </p>
    </div>
  );
}
