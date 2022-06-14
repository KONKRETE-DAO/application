import { useRef, useEffect } from 'react'
import { Box } from '@mui/material';

const MyMapComponent = ({
    center,
    zoom,
}: {
    center: google.maps.LatLngLiteral;
    zoom: number;
}) => {
    const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        const map = new window.google.maps.Map(ref.current, {
            center,
            zoom,
        });

        const marker = new window.google.maps.Marker({
            position: center,
        });

        marker.setMap(map)
    });

    return <div ref={ref} id="map" style={{ width: '100%', height: 250, marginTop: 10, marginBottom: 30 }} ></div>;
}

export default MyMapComponent;