import { Link } from 'react-router-dom';
import BenchData from './BenchData';
import BenchPhotos from './BenchPhotos';
import styles from '../styles/components/ListingItem.module.css';

export default function ListingItem({ benchData }) {
    return (
        <>
            <Link to={`/bench/${benchData?.id}`} className={styles.link}>
                <div className={styles.listing_wrapper}>
                    <div className={styles.listing_item}>
                        <BenchData
                            showOptions={true}
                            name={benchData?.name}
                            location={benchData?.location}
                            tags={benchData?.tags}
                            benchId={benchData?.id}
                        />
                        <BenchPhotos
                            showHeading={false}
                            photos={benchData?.photos}
                        />
                    </div>
                </div>
            </Link>
            <hr className={styles.divider} />
        </>
    );
}
