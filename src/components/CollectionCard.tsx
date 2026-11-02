
import React from 'react';
import chestIcon from '../assets/peti.png';

interface CollectionCardProps {
  collected?: number;
  total?: number;
  onClick?: () => void;
}

export default function CollectionCard({
  collected = 8,
  total = 24,
  onClick,
}: CollectionCardProps) {
  return (
    <button
      className="collection-card"
      onClick={onClick}
      type="button"
    >
      <span className="collection-chest"><img src={chestIcon} alt="Peti koleksi" /></span>

      <span className="collection-content">
        <strong>Koleksi Bentuk</strong>

        <span className="collection-progress">
          <span
            style={{
              width: `${(collected / total) * 100}%`,
            }}
          />
        </span>

        <small>{collected}/{total} bentuk</small>
      </span>

      <span className="collection-arrow">›</span>
    </button>
  );
}
