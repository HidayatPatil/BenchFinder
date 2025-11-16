import { useState, useEffect } from 'react';
import DetailsDrawer from '../components/DetailsDrawer';
import Map from '../components/Map';
import { FiChevronLeft } from 'react-icons/fi';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

export default function Bench() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [benchData, setBenchData] = useState(null);

    useEffect(() => {
        console.log('Current ID:', id);
        // Load benches from localStorage
        try {
            const storedBenches = localStorage.getItem('benches');
            console.log('Stored benches:', storedBenches);

            const benches = JSON.parse(storedBenches || '[]');
            console.log('Parsed benches:', benches);

            const bench = benches.find((b) => b.id.toString() === id);
            console.log('Found bench:', bench);

            if (bench) {
                setBenchData(bench);
            } else {
                console.error('Bench not found');
                navigate('/'); // Redirect to home if bench not found
            }
        } catch (error) {
            console.error('Error loading bench data:', error);
            navigate('/');
        }
    }, [id, navigate, location.key]);

    if (!benchData) {
        return <div className='loading-state'>Loading bench details...</div>;
    }

    console.log('Rendering bench with data:', benchData);

    return (
        <div className='bench_details_page'>
            <Link to='/' className='back_background'>
                <FiChevronLeft className='back_to_home' />
            </Link>
            <div className='map_section'>
                <Map coordinates={benchData.coordinates} />
            </div>
            <DetailsDrawer
                name={benchData.name}
                location={benchData.location}
                rating={benchData.rating}
                tags={benchData.tags}
                photos={benchData.photos}
                cleanliness={benchData.cleanliness}
                view={benchData.view}
                benchId={benchData.id}
            />
        </div>
    );
}
