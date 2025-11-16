import { FiEdit3, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/BenchData.module.css';

export default function BenchActions({ benchId }) {
    const navigate = useNavigate();

    const handleDelete = () => {
        // Confirm deletion with user
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this bench?'
        );

        if (confirmDelete) {
            try {
                // Get existing benches from localStorage
                const storedBenches = localStorage.getItem('benches');
                const benches = JSON.parse(storedBenches || '[]');

                // Filter out the bench with the matching ID
                const updatedBenches = benches.filter(
                    (bench) => bench.id.toString() !== benchId.toString()
                );

                // Save updated benches back to localStorage
                localStorage.setItem('benches', JSON.stringify(updatedBenches));

                console.log('Bench deleted successfully');

                // Navigate back to home page
                navigate('/');
            } catch (error) {
                console.error('Error deleting bench:', error);
                alert('Failed to delete bench. Please try again.');
            }
        }
    };

    const handleEdit = () => {
        // Navigate to edit page with bench ID
        navigate(`/edit/${benchId}`);
    };

    const handleShare = () => {
        // TODO: Implement share functionality
        console.log('Share clicked for bench:', benchId);
        alert('Share functionality coming soon!');
    };

    return (
        <div className={styles.bench_metadata_options}>
            <FiEdit3
                className={styles.option_icons}
                onClick={handleEdit}
                title='Edit bench'
                style={{ cursor: 'pointer' }}
            />
            <FiExternalLink
                className={styles.option_icons}
                onClick={handleShare}
                title='Share bench'
                style={{ cursor: 'pointer' }}
            />
            <FiTrash2
                className={styles.option_icons}
                onClick={handleDelete}
                title='Delete bench'
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
}
