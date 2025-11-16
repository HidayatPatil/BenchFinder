import styles from '../styles/components/BenchOverview.module.css';
import { FiStar } from 'react-icons/fi';

export default function BenchOverview({
    rating = 0,
    cleanliness = '',
    view = '',
}) {
    // Helper function to format cleanliness text
    const formatCleanliness = (value) => {
        if (!value) return 'Not rated';
        // Capitalize first letter of each word
        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    // Helper function to format view text
    const formatView = (value) => {
        if (!value) return 'Not rated';
        // Capitalize first letter of each word
        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    return (
        <div className={styles.data_bench_overview}>
            <div className={styles.overview_container}>
                <div className={styles.bench_overview_container}>
                    <h4 className={styles.overview_title}>Rating</h4>
                    <div className={styles.rating_container}>
                        <FiStar className={styles.rating_icon} />
                        <p className={styles.overview_content}>{rating || 0}</p>
                    </div>
                </div>
                <span className={styles.box_data_seperators} />
                <div className={styles.bench_overview_container}>
                    <h4 className={styles.overview_title}>Cleanliness</h4>
                    <p className={styles.overview_content}>
                        {formatCleanliness(cleanliness)}
                    </p>
                </div>
                <span className={styles.box_data_seperators} />
                <div className={styles.bench_overview_container}>
                    <h4 className={styles.overview_title}>View</h4>
                    <p className={styles.overview_content}>
                        {formatView(view)}
                    </p>
                </div>
            </div>
        </div>
    );
}
