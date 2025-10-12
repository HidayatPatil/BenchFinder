import styles from "../styles/components/BenchOverview.module.css";
import { FiMapPin } from "react-icons/fi";

export default function BenchOverview() {
  return (
    <div className={styles.data_bench_overview}>
      <div className={styles.bench_distance}>
        <FiMapPin className={styles.distance_icon}/>
        <p>1.2 km</p>
      </div>
      <div className={styles.overview_container}>
        <div className={styles.bench_overview_container}>
          <h4 className={styles.overview_title}>Type</h4>
          <p className={styles.overview_content}>Wooden</p>
        </div>
        <span className={styles.box_data_seperators} />
        <div className={styles.bench_overview_container}>
          <h4 className={styles.overview_title}>Cleanliness</h4>
          <p className={styles.overview_content}>Very Clean</p>
        </div>
        <span className={styles.box_data_seperators} />
        <div className={styles.bench_overview_container}>
          <h4 className={styles.overview_title}>View</h4>
          <p className={styles.overview_content}>Good</p>
        </div>
      </div>
    </div>
  );
}
