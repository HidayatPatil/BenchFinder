import { Link } from 'react-router-dom';
import BenchData from './BenchData';
import BenchPhotos from './BenchPhotos';
import styles from '../styles/components/ListingItem.module.css';

export default function ListingItem({ benchData }) {
    const handleActionsClick = (e) => {
        e.preventDefault(); // Prevent navigation when clicking actions
        e.stopPropagation();
    };

    return (
        <>
            <div className={styles.listing_wrapper}>
                <Link to={`/bench/${benchData?.id}`} className={styles.link}>
                    <div className={styles.listing_item}>
                        <div onClick={handleActionsClick}>
                            <BenchData
                                showOptions={true}
                                name={benchData?.name}
                                location={benchData?.location}
                                tags={benchData?.tags}
                                benchId={benchData?.id}
                            />
                        </div>
                        <BenchPhotos
                            showHeading={false}
                            photos={benchData?.photos}
                        />
                    </div>
                </Link>
            </div>
            <hr className={styles.divider} />
        </>
    );
}
