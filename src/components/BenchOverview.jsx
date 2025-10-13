import styles from "../styles/components/BenchOverview.module.css";
import { FiStar } from "react-icons/fi";

export default function BenchOverview() {
  return (
    <div className={styles.data_bench_overview}>
      <div className={styles.overview_container}>
        <div className={styles.bench_overview_container}>
          <h4 className={styles.overview_title}>Rating</h4>
          <div className={styles.rating_container}>
            <FiStar className={styles.rating_icon} />
            <p className={styles.overview_content}>4</p>
          </div>
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
