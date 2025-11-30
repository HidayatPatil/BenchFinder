import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/BenchPhotos.module.css';
import { FiPlus } from 'react-icons/fi';

export default function BenchPhotos({
    showHeading = true,
    photos = [],
    benchId = null,
    onPhotosUpdate,
}) {
    const displayPhotos = photos.slice(0, 4); // Only show up to 4 photos
    const fileInputRef = useRef(null);
    const galleryRef = useRef(null);
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const resizeImage = (dataUrl, maxWidth = 800) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const scale = maxWidth / img.width;
                canvas.width = maxWidth;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                resolve(canvas.toDataURL('image/jpeg', 0.7));
            };
        });
    };

    const handlePhotoUpload = async (event) => {
        if (!benchId) return;

        const files = Array.from(event.target.files);
        const newPhotos = [];

        // Read all files
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                const dataUrl = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsDataURL(file);
                });

                // Resize the image
                const resizedPhoto = await resizeImage(dataUrl);
                newPhotos.push(resizedPhoto);
            }
        }

        if (newPhotos.length === 0) return;

        try {
            // Load benches from localStorage
            const storedBenches = localStorage.getItem('benches');
            const benches = JSON.parse(storedBenches || '[]');

            // Find and update the bench
            const updatedBenches = benches.map((bench) => {
                if (bench.id.toString() === benchId.toString()) {
                    return {
                        ...bench,
                        photos: [...(bench.photos || []), ...newPhotos],
                        updatedAt: new Date().toISOString(),
                    };
                }
                return bench;
            });

            // Save back to localStorage
            localStorage.setItem('benches', JSON.stringify(updatedBenches));

            // Notify parent component to refresh
            if (onPhotosUpdate) {
                onPhotosUpdate();
            } else {
                // Force page refresh by navigating with new state
                navigate(`/bench/${benchId}`, {
                    replace: false,
                    state: { updated: Date.now() },
                });
            }

            console.log('Photos added successfully');
        } catch (error) {
            console.error('Error adding photos:', error);
            alert('Failed to add photos. Please try again.');
        }

        // Clear the input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handlePlusClick = () => {
        if (benchId && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleMouseDown = (e) => {
        if (!galleryRef.current) return;
        e.preventDefault();
        setIsDragging(true);
        setHasDragged(false);
        setStartX(e.pageX - galleryRef.current.offsetLeft);
        setScrollLeft(galleryRef.current.scrollLeft);
        galleryRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        if (galleryRef.current) {
            galleryRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (galleryRef.current) {
            galleryRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging || !galleryRef.current) return;
        e.preventDefault();
        const x = e.pageX - galleryRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling

        if (Math.abs(walk) > 5) {
            setHasDragged(true);
        }

        galleryRef.current.scrollLeft = scrollLeft - walk;
    };

    const handlePhotoClick = (photo) => {
        if (!hasDragged && showHeading) {
            setSelectedPhoto(photo);
        }
    };

    const closeModal = () => {
        setSelectedPhoto(null);
    };

    return (
        <div className={styles.bench_photos}>
            <div
                className={`${styles.photos_heading} ${
                    !showHeading ? styles.photos_heading_hidden : ''
                }`}
            >
                <h3>Photos</h3>
                {showHeading && benchId && (
                    <>
                        <FiPlus
                            className={styles.option_icons}
                            onClick={handlePlusClick}
                            style={{ cursor: 'pointer' }}
                            title='Add photos'
                        />
                        <input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*'
                            multiple
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                    </>
                )}
                {showHeading && !benchId && (
                    <FiPlus className={styles.option_icons} />
                )}
            </div>
            <div
                ref={galleryRef}
                className={styles.photos_gallery}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {displayPhotos.length > 0 ? (
                    displayPhotos.map((photo, index) => (
                        <div
                            key={index}
                            className={styles.gallery_image}
                            onClick={() => handlePhotoClick(photo)}
                        >
                            <img
                                src={photo}
                                alt={`Bench photo ${index + 1}`}
                                className={styles.gallery_photo}
                                draggable={false}
                            />
                        </div>
                    ))
                ) : (
                    <div className={styles.gallery_image}></div>
                )}
            </div>

            {selectedPhoto && (
                <div className={styles.photo_modal} onClick={closeModal}>
                    <div
                        className={styles.modal_content}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={styles.close_button}
                            onClick={closeModal}
                        >
                            ×
                        </button>
                        <img
                            src={selectedPhoto}
                            alt='Full size view'
                            className={styles.modal_image}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
