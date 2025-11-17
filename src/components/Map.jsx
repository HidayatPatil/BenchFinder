import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';
import styles from '../styles/components/Map.module.css';

export default function Map({ coordinates }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ['places', 'geometry'],
    });

    // Use provided coordinates or default to London
    const center = useMemo(
        () => coordinates || { lat: 51.5074, lng: -0.1278 },
        [coordinates]
    );

    // Memoize the map options to prevent unnecessary re-renders
    const options = useMemo(
        () => ({
            disableDefaultUI: true, // Removes all default UI
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            draggable: false, // Prevents panning
            scrollwheel: false, // Prevents zooming with mouse wheel
            gestureHandling: 'none', // Disables all touch/mouse gestures
            keyboardShortcuts: false, // Disables keyboard controls
            clickableIcons: false, // Prevents clicking on POIs
            styles: [
                {
                    featureType: 'poi',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }],
                },
                {
                    featureType: 'transit',
                    elementType: 'labels',
                    stylers: [{ visibility: 'off' }],
                },
            ],
        }),
        []
    );

    if (!isLoaded) {
        return <div className={styles.loading}>Loading...</div>;
    }

    return (
        <GoogleMap
            zoom={16}
            center={center}
            options={options}
            mapContainerClassName={styles.map_container}
        >
            {coordinates && (
                <Marker position={coordinates} title='Bench Location' />
            )}
        </GoogleMap>
    );
}
