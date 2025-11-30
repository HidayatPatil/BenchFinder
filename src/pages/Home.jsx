import { useState, useEffect } from 'react';
import FAB from '../components/FAB';
import { FiFilter } from 'react-icons/fi';
import ListingItem from '../components/ListingItem';

export default function Home() {
    const [benches, setBenches] = useState([]);

    const loadBenches = () => {
        // Load benches from localStorage
        const storedBenches = localStorage.getItem('benches');
        if (storedBenches) {
            try {
                const parsedBenches = JSON.parse(storedBenches);
                setBenches(parsedBenches);
            } catch (error) {
                console.error(
                    'Error parsing benches from localStorage:',
                    error
                );
            }
        } else {
            setBenches([]);
        }
    };

    useEffect(() => {
        loadBenches();
    }, []); // Empty dependency array means this runs once when component mounts

    const handleDelete = (benchId) => {
        // Confirm deletion with user
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this bench?'
        );

        if (confirmDelete) {
            try {
                // Get existing benches from localStorage
                const storedBenches = localStorage.getItem('benches');
                const benchesList = JSON.parse(storedBenches || '[]');

                // Filter out the bench with the matching ID
                const updatedBenches = benchesList.filter(
                    (bench) => bench.id.toString() !== benchId.toString()
                );

                // Save updated benches back to localStorage
                localStorage.setItem('benches', JSON.stringify(updatedBenches));

                // Reload benches to update the UI
                loadBenches();

                console.log('Bench deleted successfully');
            } catch (error) {
                console.error('Error deleting bench:', error);
                alert('Failed to delete bench. Please try again.');
            }
        }
    };

    return (
        <div className='bench_home_page'>
            <div className='home_title_header'>
                <h2>My Benches ({benches.length})</h2>
                <FiFilter className='filter_icon' />
            </div>
            <FAB />
            <div className='bench_listings'>
                {benches.length > 0 ? (
                    benches.map((bench) => (
                        <ListingItem key={bench.id} benchData={bench} />
                    ))
                ) : (
                    <div className='no-benches-message'>
                        No benches added yet. Click the + button to add your
                        first bench!
                    </div>
                )}
            </div>
        </div>
    );
}
