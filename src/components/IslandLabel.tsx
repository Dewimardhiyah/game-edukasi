
import React from 'react';

import label1 from '../assets/lv-1.png';
import label2 from '../assets/lv-2.png';
import label3 from '../assets/lv-3.png';
import label4 from '../assets/lv-4.png';
import label5 from '../assets/lv-5.png';

interface IslandLabelProps {
  islandNumber: number;
}

const islandLabels: Record<number, string> = {
  1: label1,
  2: label2,
  3: label3,
  4: label4,
  5: label5,
};

export default function IslandLabel({
  islandNumber,
}: IslandLabelProps) {
  return (
    <div className="island-label">
      <img
        src={islandLabels[islandNumber]}
        alt={`Pulau ${islandNumber}`}
      />
    </div>
  );
}
