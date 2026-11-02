import { useMemo } from 'react';
import { useTheme } from '../ThemeProvider';

const FILLS = [
  'rgba(107, 42, 203, 0.10)',
  'rgba(65, 105, 255, 0.07)',
  'rgba(39, 199, 217, 0.09)',
  'rgba(233, 154, 194, 0.12)',
];

export default function CrystalFallback() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const strokeMain = dark ? '#8A4DE8' : '#5B1DB8';
  const strokeDark = dark ? 'rgba(248,245,255,0.35)' : '#1D062B';
  const { shards, inner } = useMemo(() => {
    const N = 14;
    const shards = [];
    for (let i = 0; i < N; i++) {
      const a1 = (i / N) * Math.PI * 2;
      const a2 = ((i + 1) / N) * Math.PI * 2;
      const r1 = i % 2 === 0 ? 150 : 128;
      const r2 = (i + 1) % 2 === 0 ? 150 : 128;
      shards.push(
        `200,200 ${(200 + Math.cos(a1) * r1).toFixed(1)},${(200 + Math.sin(a1) * r1).toFixed(1)} ` +
          `${(200 + Math.cos(a2) * r2).toFixed(1)},${(200 + Math.sin(a2) * r2).toFixed(1)}`
      );
    }
    const inner = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
      inner.push(`${(200 + Math.cos(a) * 82).toFixed(1)},${(200 + Math.sin(a) * 82).toFixed(1)}`);
    }
    return { shards, inner: inner.join(' ') };
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      data-testid="crystal-fallback"
      aria-hidden="true"
    >
      <div
        className="absolute aspect-square w-[46vh] rounded-full opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 42% 38%, rgba(107,42,203,0.14), rgba(65,105,255,0.08) 42%, rgba(39,199,217,0.06) 62%, transparent 72%)',
        }}
      />
      <svg
        viewBox="0 0 400 400"
        className="relative aspect-square w-[58vmin] max-w-[560px]"
        role="img"
        aria-label="The Calyza Crystal"
      >
        <g className="crystal-spin" style={{ transformBox: 'fill-box' }}>
          {shards.map((points, i) => (
            <polygon
              key={i}
              points={points}
              fill={FILLS[i % FILLS.length]}
              stroke={strokeDark}
              strokeOpacity={dark ? 1 : 0.18}
              strokeWidth="0.75"
            />
          ))}
          <circle cx="200" cy="200" r="150" fill="none" stroke={strokeMain} strokeOpacity="0.35" strokeWidth="0.75" />
        </g>
        <g className="crystal-spin-reverse" style={{ transformBox: 'fill-box' }}>
          <polygon
            points={inner}
            fill={dark ? 'rgba(23, 16, 34, 0.5)' : 'rgba(243, 238, 255, 0.5)'}
            stroke="#4169FF"
            strokeOpacity="0.4"
            strokeWidth="0.75"
          />
          <circle cx="200" cy="200" r="30" fill="none" stroke={strokeDark} strokeOpacity={dark ? 1 : 0.45} strokeWidth="0.75" />
        </g>
        <circle cx="200" cy="200" r="4" fill={dark ? '#F8F5FF' : '#1D062B'} fillOpacity="0.7" />
      </svg>
    </div>
  );
}
