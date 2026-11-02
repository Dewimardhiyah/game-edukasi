
import React from 'react';
import mapTitle from '../assets/peta_petualangan.png';

export default function MapTitle() {
  return (
    <div className="map-title">
      <img
        src={mapTitle}
        alt="Peta Petualangan"
        className="map-title__image"
      />
    </div>
  );
}
