import styles from '../styles/components/BenchData.module.css';
import Tags from './Tags';
import BenchActions from './BenchActions';
import { FiMapPin } from 'react-icons/fi';

export default function BenchData({
    showOptions = true,
    name,
    location,
    tags = [],
    benchId,
    rating = 0,
}) {
    return (
        <div className={styles.data_metadata}>
            <div className={styles.metadata_name_options}>
                <h2>{name || 'Unnamed Bench'}</h2>
                {showOptions && benchId && <BenchActions benchId={benchId} />}
            </div>
            {rating > 0 && (
                <div className={styles.star_rating}>
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            className={`${styles.star} ${
                                index < rating ? styles.star_filled : ''
                            }`}
                        >
                            ★
                        </span>
                    ))}
                </div>
            )}
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
                {location || 'Location not available'}
            </p>
        </div>
    );
}
