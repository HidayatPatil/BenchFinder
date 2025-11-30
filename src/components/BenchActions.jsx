import { useState } from 'react';
import { FiEdit3, FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/BenchData.module.css';

export default function BenchActions({ benchId }) {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

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

                // Dispatch custom event to notify other components
                window.dispatchEvent(new Event('benchesUpdated'));

                // Navigate back to home page
                navigate('/');
            } catch (error) {
                console.error('Error deleting bench:', error);
                alert('Failed to delete bench. Please try again.');
            }
        }
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Navigate to edit page with bench ID
        navigate(`/edit/${benchId}`);
    };

    const handleShare = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const url =
                typeof window !== 'undefined' ? window.location.href : '';
            const title = document.title || 'Check out this bench';
            const text = 'I found this great bench!';

            if (navigator.share) {
                await navigator.share({ title, text, url });
                return;
            }

            if (navigator.clipboard && url) {
                await navigator.clipboard.writeText(url);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (error) {
            console.error('Share failed:', error);
        }
    };

    return (
        <div
            className={styles.bench_metadata_options}
            style={{ position: 'relative' }}
        >
            <FiEdit3
                className={styles.option_icons}
                onClick={handleEdit}
                title='Edit bench'
                style={{ cursor: 'pointer' }}
            />
            <FiExternalLink
                className={`${styles.option_icons} share-button`}
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
            {copied && <span className='copy-message'>Link copied!</span>}
        </div>
    );
}
