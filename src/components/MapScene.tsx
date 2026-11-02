
import React from 'react';

import MapTitle from './MapTitle';
import IslandMap from './IslandMap';
import CollectionCard from './CollectionCard';

interface MapSceneProps {
  levelStars?: Record<number, number>;
  onSelectLevel?: (level: number) => void;
}

export default function MapScene({
  levelStars,
  onSelectLevel,
}: MapSceneProps) {
  return (
    <section className="map-scene">

      <MapTitle />

      <IslandMap
        levelStars={levelStars}
        onSelectLevel={onSelectLevel}
      />

      <CollectionCard />

    </section>
  );
}
