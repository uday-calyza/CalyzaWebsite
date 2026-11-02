/* Abstract geometric case-study artwork — monochrome + Calyza violet, one motif per problem type.
   Deliberately NOT generic AI imagery: each mark describes the actual workflow. */

const FG = 'currentColor';
const PEACH = 'rgb(var(--accent-primary))';

function InvoiceMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <rect x="120" y="52" width="120" height="156" stroke={FG} />
      <line x1="138" y1="84" x2="222" y2="84" stroke={FG} opacity="0.5" />
      <line x1="138" y1="104" x2="222" y2="104" stroke={FG} opacity="0.5" />
      <line x1="138" y1="124" x2="196" y2="124" stroke={FG} opacity="0.5" />
      <line x1="138" y1="158" x2="222" y2="158" stroke={PEACH} />
      <circle cx="252" cy="196" r="26" stroke={PEACH} />
      <path d="M241 196 L249 204 L264 187" stroke={PEACH} />
      <path d="M96 130 H116" stroke={FG} opacity="0.6" />
      <path d="M104 122 L116 130 L104 138" stroke={FG} opacity="0.6" />
    </g>
  );
}

function MortgageMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <rect x="88" y="60" width="104" height="140" stroke={FG} />
      <line x1="104" y1="88" x2="176" y2="88" stroke={FG} opacity="0.5" />
      <line x1="104" y1="106" x2="176" y2="106" stroke={FG} opacity="0.5" />
      <line x1="104" y1="124" x2="152" y2="124" stroke={FG} opacity="0.5" />
      <path d="M232 190 A44 44 0 0 1 320 190" stroke={FG} opacity="0.6" />
      <path d="M232 190 A44 44 0 0 1 298 153" stroke={PEACH} strokeWidth="2" />
      <line x1="276" y1="190" x2="300" y2="160" stroke={PEACH} strokeWidth="2" />
      <circle cx="276" cy="190" r="4" fill={PEACH} stroke="none" />
    </g>
  );
}

function OcrMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <rect x="120" y="52" width="120" height="156" stroke={FG} />
      <path d="M136 96 q14 -22 28 0 q14 22 28 0 q14 -22 28 0" stroke={FG} opacity="0.6" />
      <line x1="136" y1="130" x2="224" y2="130" stroke={FG} opacity="0.4" />
      <line x1="136" y1="148" x2="200" y2="148" stroke={FG} opacity="0.4" />
      <line x1="104" y1="120" x2="256" y2="120" stroke={PEACH} strokeWidth="2" />
      <path d="M100 36 h-14 v14 M260 36 h14 v14 M100 224 h-14 v-14 M260 224 h14 v-14" stroke={PEACH} />
    </g>
  );
}

function ReferralMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <rect x="92" y="72" width="96" height="124" stroke={FG} opacity="0.5" />
      <rect x="104" y="60" width="96" height="124" stroke={FG} />
      <line x1="118" y1="88" x2="186" y2="88" stroke={FG} opacity="0.5" />
      <line x1="118" y1="106" x2="186" y2="106" stroke={FG} opacity="0.5" />
      <path d="M212 122 H248" stroke={PEACH} strokeWidth="2" />
      <path d="M240 114 L248 122 L240 130" stroke={PEACH} strokeWidth="2" />
      <rect x="258" y="84" width="66" height="14" stroke={PEACH} />
      <rect x="258" y="106" width="66" height="14" stroke={FG} opacity="0.6" />
      <rect x="258" y="128" width="66" height="14" stroke={FG} opacity="0.6" />
      <rect x="258" y="150" width="66" height="14" stroke={FG} opacity="0.6" />
    </g>
  );
}

function TravelMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <circle cx="200" cy="66" r="14" stroke={PEACH} />
      <line x1="200" y1="88" x2="200" y2="104" stroke={FG} opacity="0.6" />
      <rect x="104" y="104" width="192" height="26" stroke={PEACH} />
      <rect x="120" y="146" width="160" height="26" stroke={FG} />
      <rect x="136" y="188" width="128" height="26" stroke={FG} opacity="0.6" />
      <line x1="160" y1="130" x2="160" y2="146" stroke={FG} opacity="0.5" />
      <line x1="240" y1="130" x2="240" y2="146" stroke={FG} opacity="0.5" />
      <line x1="200" y1="172" x2="200" y2="188" stroke={FG} opacity="0.5" />
    </g>
  );
}

function ChatbotMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <path d="M104 78 h120 a10 10 0 0 1 10 10 v52 a10 10 0 0 1 -10 10 h-88 l-22 20 v-20 h-10 a10 10 0 0 1 -10 -10 v-52 a10 10 0 0 1 10 -10 z" stroke={FG} opacity="0.6" />
      <path d="M196 150 h92 a10 10 0 0 1 10 10 v44 a10 10 0 0 1 -10 10 h-60 l-20 18 v-18 h-12 a10 10 0 0 1 -10 -10 v-44 a10 10 0 0 1 10 -10 z" stroke={PEACH} />
      <circle cx="222" cy="182" r="3" fill={PEACH} stroke="none" />
      <circle cx="242" cy="182" r="3" fill={PEACH} stroke="none" />
      <circle cx="262" cy="182" r="3" fill={PEACH} stroke="none" />
    </g>
  );
}

function MarketplaceMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <circle cx="200" cy="140" r="16" stroke={PEACH} />
      <rect x="76" y="56" width="72" height="40" stroke={FG} opacity="0.7" />
      <rect x="252" y="56" width="72" height="40" stroke={FG} opacity="0.7" />
      <rect x="164" y="216" width="72" height="40" stroke={FG} opacity="0.7" />
      <line x1="148" y1="96" x2="188" y2="128" stroke={FG} opacity="0.4" />
      <line x1="252" y1="96" x2="212" y2="128" stroke={FG} opacity="0.4" />
      <line x1="200" y1="156" x2="200" y2="216" stroke={PEACH} />
      <text x="112" y="80" textAnchor="middle" className="fill-t-fg-mut" fontSize="7" fontFamily="Geist Mono, monospace">PORTAL</text>
      <text x="288" y="80" textAnchor="middle" className="fill-t-fg-mut" fontSize="7" fontFamily="Geist Mono, monospace">PORTAL</text>
      <text x="200" y="240" textAnchor="middle" className="fill-t-fg-mut" fontSize="7" fontFamily="Geist Mono, monospace">PORTAL</text>
    </g>
  );
}

function EcommerceMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <rect x="96" y="64" width="150" height="110" stroke={FG} />
      <line x1="96" y1="88" x2="246" y2="88" stroke={FG} opacity="0.5" />
      <circle cx="110" cy="76" r="2.5" fill={FG} stroke="none" opacity="0.5" />
      <circle cx="122" cy="76" r="2.5" fill={FG} stroke="none" opacity="0.5" />
      <path d="M120 130 q20 -26 44 0" stroke={PEACH} />
      <circle cx="120" cy="130" r="5" stroke={PEACH} />
      <circle cx="164" cy="130" r="5" stroke={PEACH} />
      <path d="M276 96 l28 14 v28 l-28 14 -28 -14 v-28 z" stroke={FG} opacity="0.7" />
      <path d="M276 96 v28 M248 110 l28 14 28 -14" stroke={FG} opacity="0.4" />
    </g>
  );
}

function PipelineMark() {
  const xs = [86, 166, 246, 326];
  return (
    <g fill="none" strokeWidth="1.5">
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x - 26} y="118" width="52" height="34" stroke={i === 3 ? PEACH : FG} strokeOpacity={i === 3 ? 1 : 0.7} />
          {i < 3 && <path d={`M${x + 28} 135 h26 m-8 -6 l8 6 -8 6`} stroke={PEACH} opacity="0.8" />}
        </g>
      ))}
      <text x="86" y="108" textAnchor="middle" className="fill-t-fg-mut" fontSize="7" fontFamily="Geist Mono, monospace">COMMIT</text>
      <text x="166" y="108" textAnchor="middle" className="fill-t-fg-mut" fontSize="7" fontFamily="Geist Mono, monospace">BUILD</text>
      <text x="246" y="108" textAnchor="middle" className="fill-t-fg-mut" fontSize="7" fontFamily="Geist Mono, monospace">TEST</text>
      <text x="326" y="108" textAnchor="middle" className="fill-t-fg-mut" fontSize="7" fontFamily="Geist Mono, monospace" fill={PEACH}>LIVE</text>
      <line x1="60" y1="180" x2="352" y2="180" stroke={FG} strokeOpacity="0.25" strokeDasharray="2 5" />
    </g>
  );
}

function OptimizeMark() {
  return (
    <g fill="none" strokeWidth="1.5">
      <line x1="84" y1="196" x2="320" y2="196" stroke={FG} opacity="0.4" />
      {[150, 118, 92, 70].map((h, i) => (
        <rect key={i} x={104 + i * 56} y={196 - h} width="26" height={h} stroke={i === 3 ? PEACH : FG} strokeOpacity={i === 3 ? 1 : 0.6} fill={i === 3 ? 'rgb(var(--accent-primary) / 0.08)' : 'none'} />
      ))}
      <path d="M96 84 L300 48" stroke={PEACH} strokeDasharray="4 5" />
      <path d="M288 46 l14 0 -2 12" stroke={PEACH} />
      <text x="330" y="60" className="fill-t-fg-mut" fontSize="7" fontFamily="Geist Mono, monospace">-50%</text>
    </g>
  );
}

const MOTIFS = {
  invoice: InvoiceMark,
  mortgage: MortgageMark,
  ocr: OcrMark,
  referral: ReferralMark,
  travel: TravelMark,
  chatbot: ChatbotMark,
  marketplace: MarketplaceMark,
  ecommerce: EcommerceMark,
  pipeline: PipelineMark,
  optimize: OptimizeMark,
};

export default function CaseVisual({ motif, className = '', testId }) {
  const Mark = MOTIFS[motif] || InvoiceMark;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-t-bg-sub ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(rgb(var(--border) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--border) / 0.05) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }}
      data-testid={testId}
      role="img"
      aria-label={`Abstract diagram for ${motif} case study`}
    >
      <svg viewBox="0 0 400 260" className="h-full w-full max-h-[420px] text-t-fg transition-transform duration-300">
        <Mark />
      </svg>
    </div>
  );
}
