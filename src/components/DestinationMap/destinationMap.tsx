import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo } from "react";

interface DestinationMap {
    latitude: number,
    longitude: number
}

export default function DestinationMap({latitude, longitude}: DestinationMap) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'default',
    });

    const center = useMemo(() => ({ lat: latitude, lng: longitude }), []);
    const containerStyle = {
        width: '100%',
        height: '300px'
      };      
    
    return <>
      {isLoaded && <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <Marker position={{ lat: latitude, lng: longitude }} />
        </GoogleMap>}
    </>;
}