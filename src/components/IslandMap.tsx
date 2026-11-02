import React, { useLayoutEffect, useRef, useState } from 'react';

import { mapIslands, computeLayout, getLevelStatus } from '../data/mapData';
import LevelNode from './LevelNode';
import IslandLabel from './IslandLabel';

interface IslandMapProps {
  levelStars?: Record<number, number>; // level -> bintang terbaik
  onSelectLevel?: (level: number) => void;
}

const f = (n: number) => n.toFixed(1);

export default function IslandMap({ levelStars = {}, onSelectLevel }: IslandMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  // Ukur area peta; hitung ulang saat ukuran layar berubah
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ready = size.w > 0 && size.h > 0;
  const layout = ready ? computeLayout(size.w, size.h) : null;

  // Titik tiap level dalam px (untuk jalur)
  const points = layout
    ? mapIslands.map((island, i) => {
        const L = layout.islands[i];
        return island.levels.map((lv) => ({
          x: L.left + (lv.x / 100) * L.width,
          y: L.top + (lv.y / 100) * L.height,
        }));
      })
    : [];

  const paths: string[] = [];
  points.forEach((pos, i) => {
    // jalur dalam pulau: antar level di baris yang sama
    for (let k = 0; k < pos.length - 1; k++) {
      if (Math.abs(pos[k].y - pos[k + 1].y) < 1) {
        paths.push(`M ${f(pos[k].x)} ${f(pos[k].y)} L ${f(pos[k + 1].x)} ${f(pos[k + 1].y)}`);
      }
    }
    // jalur antar pulau: level terakhir -> level pertama pulau berikutnya
    const next = points[i + 1];
    if (next) {
      const a = pos[pos.length - 1];
      const b = next[0];
      const my = (a.y + b.y) / 2;
      paths.push(`M ${f(a.x)} ${f(a.y)} C ${f(a.x)} ${f(my)}, ${f(b.x)} ${f(my)}, ${f(b.x)} ${f(b.y)}`);
    }
  });

  return (
    <div
      ref={ref}
      className="map-world"
      style={layout ? ({ '--iw': `${layout.iw}px` } as React.CSSProperties) : undefined}
    >
      {layout && (
        <>
          <svg
            className="map-path"
            viewBox={`0 0 ${size.w} ${size.h}`}
            aria-hidden="true"
          >
            {paths.map((d, i) => (
              <path key={i} d={d} className="map-path__line" />
            ))}
          </svg>

          {mapIslands.map((island, i) => {
            const L = layout.islands[i];
            return (
              <div
                key={island.id}
                className={`map-island map-island--${island.id}`}
                style={{ left: L.left, top: L.top, width: L.width }}
              >
                <img
                  src={island.image}
                  alt={`Pulau ${island.id}`}
                  className="map-island__image"
                  draggable={false}
                />

                <IslandLabel islandNumber={island.id} />

                {island.levels.map((level) => (
                  <LevelNode
                    key={level.number}
                    level={level.number}
                    status={getLevelStatus(level.number, levelStars)}
                    stars={levelStars[level.number]}
                    onClick={onSelectLevel}
                    style={{ left: `${level.x}%`, top: `${level.y}%` }}
                  />
                ))}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
