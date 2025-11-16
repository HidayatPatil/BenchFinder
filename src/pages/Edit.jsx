import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Add from '../components/Add';

export default function Edit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [benchData, setBenchData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            // Load benches from localStorage
            const storedBenches = localStorage.getItem('benches');
            const benches = JSON.parse(storedBenches || '[]');

            // Find the bench to edit
            const bench = benches.find((b) => b.id.toString() === id);

            if (bench) {
                setBenchData(bench);
            } else {
                console.error('Bench not found');
                navigate('/'); // Redirect to home if bench not found
            }
        } catch (error) {
            console.error('Error loading bench data:', error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    }, [id, navigate]);

    if (loading) {
        return <div className='loading-state'>Loading bench data...</div>;
    }

    if (!benchData) {
        return null;
    }

    return <Add initialData={benchData} isEditMode={true} />;
}
