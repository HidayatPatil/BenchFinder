import { useState, useEffect } from 'react';
import '../styles/components/Add.css';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { FiRefreshCw } from 'react-icons/fi';

const Add = ({ onSubmit, initialData = null, isEditMode = false }) => {
    const navigate = useNavigate();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    const [benchData, setBenchData] = useState(
        initialData || {
            name: '',
            location: '',
            coordinates: null,
            rating: 0,
            tags: [],
            photos: [],
            cleanliness: '',
            view: '',
        }
    );

    const [isLoading, setIsLoading] = useState(!initialData);
    const [error, setError] = useState(null);

    const handleLocationRefresh = async () => {
        setIsLoading(true);
        setError(null);

        if ('geolocation' in navigator) {
            try {
                const position = await new Promise((resolve, reject) => {
                    // Set timeout for geolocation request
                    const timeoutId = setTimeout(() => {
                        reject(
                            new Error(
                                'Location request timed out. Please try again.'
                            )
                        );
                    }, 10000); // 10 second timeout

                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            clearTimeout(timeoutId);
                            resolve(pos);
                        },
                        (err) => {
                            clearTimeout(timeoutId);
                            reject(err);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 10000,
                            maximumAge: 0,
                        }
                    );
                });

                const { latitude, longitude } = position.coords;

                // Reverse geocoding to get address
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
                        import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY
                    }`
                );
                const data = await response.json();

                if (data.results[0]) {
                    setBenchData((prev) => ({
                        ...prev,
                        location: data.results[0].formatted_address,
                        coordinates: { lat: latitude, lng: longitude },
                    }));
                } else {
                    // Set coordinates even if address lookup fails
                    setBenchData((prev) => ({
                        ...prev,
                        location: `${latitude.toFixed(4)}, ${longitude.toFixed(
                            4
                        )}`,
                        coordinates: { lat: latitude, lng: longitude },
                    }));
                }
            } catch (err) {
                console.error('Location error:', err);
                let errorMessage = 'Failed to get location. ';

                if (err.code === 1) {
                    errorMessage +=
                        'Please allow location access in your browser.';
                } else if (err.code === 2) {
                    errorMessage +=
                        'Location unavailable. Check your device settings.';
                } else if (
                    err.code === 3 ||
                    err.message.includes('timed out')
                ) {
                    errorMessage += 'Request timed out. Please try again.';
                } else {
                    errorMessage += err.message || 'Please try again.';
                }

                setError(errorMessage);
            }
        } else {
            setError('Geolocation is not supported by your browser');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const getInitialLocation = async () => {
            if ('geolocation' in navigator) {
                try {
                    const position = await new Promise((resolve, reject) => {
                        // Set timeout for geolocation request
                        const timeoutId = setTimeout(() => {
                            reject(
                                new Error(
                                    'Location request timed out. Please try again.'
                                )
                            );
                        }, 10000); // 10 second timeout

                        navigator.geolocation.getCurrentPosition(
                            (pos) => {
                                clearTimeout(timeoutId);
                                resolve(pos);
                            },
                            (err) => {
                                clearTimeout(timeoutId);
                                reject(err);
                            },
                            {
                                enableHighAccuracy: true,
                                timeout: 10000,
                                maximumAge: 0,
                            }
                        );
                    });

                    const { latitude, longitude } = position.coords;

                    // Reverse geocoding to get address
                    try {
                        const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
                                import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY
                            }`
                        );
                        const data = await response.json();

                        if (data.results[0]) {
                            setBenchData((prev) => ({
                                ...prev,
                                location: data.results[0].formatted_address,
                                coordinates: { lat: latitude, lng: longitude },
                            }));
                        } else {
                            // Set coordinates even if address lookup fails
                            setBenchData((prev) => ({
                                ...prev,
                                location: `${latitude.toFixed(
                                    4
                                )}, ${longitude.toFixed(4)}`,
                                coordinates: { lat: latitude, lng: longitude },
                            }));
                        }
                    } catch (err) {
                        console.error('Failed to get address:', err);
                        // Still set coordinates even if address lookup fails
                        setBenchData((prev) => ({
                            ...prev,
                            location: `${latitude.toFixed(
                                4
                            )}, ${longitude.toFixed(4)}`,
                            coordinates: { lat: latitude, lng: longitude },
                        }));
                    }
                } catch (error) {
                    console.error('Location error:', error);
                    let errorMessage = 'Failed to get location. ';

                    if (error.code === 1) {
                        errorMessage +=
                            'Please allow location access in your browser.';
                    } else if (error.code === 2) {
                        errorMessage +=
                            'Location unavailable. Check your device settings.';
                    } else if (
                        error.code === 3 ||
                        error.message?.includes('timed out')
                    ) {
                        errorMessage += 'Request timed out. Please try again.';
                    } else {
                        errorMessage += error.message || 'Please try again.';
                    }

                    setError(errorMessage);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setError('Geolocation is not supported by your browser');
                setIsLoading(false);
            }
        };

        // Only get location if we don't have initial data (edit mode)
        if (!initialData) {
            getInitialLocation();
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBenchData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRatingClick = (rating) => {
        setBenchData((prev) => ({
            ...prev,
            rating,
        }));
    };

    const handleTagClick = (tag) => {
        setBenchData((prev) => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag],
        }));
    };

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);

        for (const file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setBenchData((prev) => ({
                        ...prev,
                        photos: [...prev.photos, e.target.result],
                    }));
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handlePhotoDelete = (index) => {
        setBenchData((prev) => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
        }));
    };

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

    const handleSave = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (
            !benchData.name ||
            !benchData.location ||
            !benchData.cleanliness ||
            !benchData.view
        ) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            // Process and resize images
            const resizedPhotos = await Promise.all(
                benchData.photos.map((photo) => resizeImage(photo))
            );

            // Get existing benches from localStorage
            const existingBenches = JSON.parse(
                localStorage.getItem('benches') || '[]'
            );

            let updatedBenches;
            let benchWithMetadata;

            if (isEditMode && benchData.id) {
                // Edit mode: Update existing bench
                benchWithMetadata = {
                    ...benchData,
                    photos: resizedPhotos,
                    updatedAt: new Date().toISOString(),
                };

                updatedBenches = existingBenches.map((bench) =>
                    bench.id.toString() === benchData.id.toString()
                        ? benchWithMetadata
                        : bench
                );

                console.log('Bench updated successfully:', benchWithMetadata);
            } else {
                // Create mode: Add new bench
                benchWithMetadata = {
                    ...benchData,
                    photos: resizedPhotos,
                    id: Date.now(),
                    createdAt: new Date().toISOString(),
                };

                updatedBenches = [benchWithMetadata, ...existingBenches];
                console.log('Bench saved successfully:', benchWithMetadata);
            }

            // Save back to localStorage
            localStorage.setItem('benches', JSON.stringify(updatedBenches));

            // If onSubmit prop exists, call it with the bench data
            if (onSubmit) {
                onSubmit(benchWithMetadata);
            }

            // Navigate back to home page or bench detail page
            if (isEditMode) {
                // Use state to force a refresh when navigating back to bench detail
                navigate(`/bench/${benchData.id}`, {
                    replace: false,
                    state: { updated: Date.now() },
                });
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Error saving bench:', error);
            alert('There was an error saving the bench. Please try again.');
        }
    };

    const handleClose = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className='add-container'>
            <header>
                <button className='close-button' onClick={handleClose}>
                    ×
                </button>
                <h1>{isEditMode ? 'Edit Bench' : 'Add Bench'}</h1>
            </header>

            <form onSubmit={handleSave}>
                <div className='input-group'>
                    <label>Name</label>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name your bench'
                        value={benchData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='input-group'>
                    <label>Current Location</label>
                    <FiRefreshCw
                        className={`refresh_maps ${
                            isLoading ? 'spinning' : ''
                        }`}
                        onClick={handleLocationRefresh}
                        style={{ cursor: 'pointer' }}
                    />
                    {isLoading ? (
                        <div className='location-loading'>
                            Getting your location...
                        </div>
                    ) : error ? (
                        <div className='location-error'>{error}</div>
                    ) : (
                        <>
                            <input
                                type='text'
                                name='location'
                                value={benchData.location}
                                onChange={handleInputChange}
                                placeholder='Loading location...'
                                disabled='true'
                            />
                            {isLoaded && benchData.coordinates && (
                                <div className='map-preview'>
                                    <GoogleMap
                                        zoom={15}
                                        center={benchData.coordinates}
                                        options={{
                                            disableDefaultUI: true,
                                            draggable: false,
                                            scrollwheel: false,
                                            gestureHandling: 'none',
                                            keyboardShortcuts: false,
                                            clickableIcons: false,
                                            zoomControl: false,
                                            mapTypeControl: false,
                                            scaleControl: false,
                                            streetViewControl: false,
                                            rotateControl: false,
                                            fullscreenControl: false,
                                            styles: [
                                                {
                                                    featureType: 'poi',
                                                    elementType: 'labels',
                                                    stylers: [
                                                        { visibility: 'off' },
                                                    ],
                                                },
                                                {
                                                    featureType: 'transit',
                                                    elementType: 'labels',
                                                    stylers: [
                                                        { visibility: 'off' },
                                                    ],
                                                },
                                            ],
                                        }}
                                        mapContainerStyle={{
                                            width: '100%',
                                            height: '200px',
                                            borderRadius: '8px',
                                            marginTop: '8px',
                                        }}
                                    >
                                        <Marker
                                            position={benchData.coordinates}
                                        />
                                    </GoogleMap>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className='input-group'>
                    <label>Rating</label>
                    <div className='rating-stars'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type='button'
                                className={`star ${
                                    benchData.rating >= star ? 'active' : ''
                                }`}
                                onClick={() => handleRatingClick(star)}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div className='input-group'>
                    <label>Tags</label>
                    <div className='tags-container'>
                        {['trees', 'trail', 'sunset'].map((tag) => (
                            <button
                                key={tag}
                                type='button'
                                className={`tag ${
                                    benchData.tags.includes(tag) ? 'active' : ''
                                }`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='input-group'>
                    <label>Photos</label>
                    <div className='photos-container'>
                        {benchData.photos.map((photo, index) => (
                            <div key={index} className='photo-preview'>
                                <img
                                    src={photo}
                                    alt={`Bench photo ${index + 1}`}
                                />
                                <button
                                    type='button'
                                    className='delete-photo'
                                    onClick={() => handlePhotoDelete(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <label className='add-photo'>
                            <input
                                type='file'
                                accept='image/*'
                                multiple
                                onChange={handlePhotoUpload}
                                style={{ display: 'none' }}
                            />
                            +
                        </label>
                    </div>
                </div>

                <div className='input-group'>
                    <label>Cleanliness</label>
                    <select
                        name='cleanliness'
                        value={benchData.cleanliness}
                        onChange={handleInputChange}
                        required
                    >
                        <option value=''>Select bench condition</option>
                        <option value='clean'>Clean</option>
                        <option value='moderate'>Moderate</option>
                        <option value='dirty'>Dirty</option>
                    </select>
                </div>

                <div className='input-group'>
                    <label>View</label>
                    <select
                        name='view'
                        value={benchData.view}
                        onChange={handleInputChange}
                        required
                    >
                        <option value=''>Select view rating</option>
                        <option value='excellent'>Excellent</option>
                        <option value='good'>Good</option>
                        <option value='fair'>Fair</option>
                        <option value='poor'>Poor</option>
                    </select>
                </div>

                <button type='submit' className='save-button'>
                    Save
                </button>
            </form>
        </div>
    );
};

export default Add;
