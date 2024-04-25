import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY;

export default function Map({latitude,longitude}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(9.5);
  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }

  }, [lng, lat, zoom]);
  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
