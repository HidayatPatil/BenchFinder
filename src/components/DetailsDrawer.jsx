import DrawerBody from './DrawerBody';
import BenchData from './BenchData';
import BenchOverview from './BenchOverview';
import BenchPhotos from './BenchPhotos';
// import { IconContext } from "react-icons";
import styles from '../styles/components/DetailsDrawer.module.css';

export default function DetailsDrawer({
    name,
    location,
    rating,
    tags,
    photos,
    cleanliness,
    view,
    benchId,
}) {
    return (
        <DrawerBody>
            <div className={styles.bench_data}>
                {' '}
                {/* main container holding data */}
                <div className={styles.bench_information}>
                    {' '}
                    {/* section above the line break */}
                    <BenchData
                        name={name}
                        location={location}
                        rating={rating}
                        tags={tags}
                        benchId={benchId}
                        isDetailPage={true}
                    />
                    <BenchOverview
                        rating={rating}
                        cleanliness={cleanliness}
                        view={view}
                    />
                </div>
                <hr /> {/* line break */}
                <BenchPhotos photos={photos} benchId={benchId} />
            </div>
        </DrawerBody>
    );
}
