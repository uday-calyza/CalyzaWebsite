export const NAV_LINKS = [
  { label: 'Home', href: '/', testId: 'nav-link-home' },
  { label: 'Services', href: '/services', testId: 'nav-link-services' },
  { label: 'Case Studies', href: '/case-studies', testId: 'nav-link-case-studies' },
  { label: 'Events', href: '/events', testId: 'nav-link-events' },
  { label: 'Contact', href: '/contact', testId: 'nav-link-contact' },
];

export const AI_FACTORY_CTA = { label: 'Enter AI Factory', href: '/ai-factory' };

export const CRYSTAL_STATES = [
  { id: 'origin', index: '01', label: 'Origin' },
  { id: 'opening', index: '02', label: 'Open' },
  { id: 'ecosystem', index: '03', label: 'Ecosystem' },
  { id: 'acceleration', index: '04', label: 'Velocity' },
  { id: 'transition', index: '05', label: 'Transform' },
  { id: 'factory', index: '06', label: 'AI Factory' },
];

export const HERO = {
  overline: 'CalyzaTech — The Calyza Crystal',
  lines: ['AI systems for healthcare', 'and fintech, moving at', 'the speed of possibility.'],
  sub: 'Production-grade AI systems that automate work, accelerate decisions, and scale enterprise growth.',
  cue: 'Scroll to open',
  primaryCta: { label: 'Enter AI Factory', href: '/ai-factory' },
  secondaryCta: { label: 'View Case Studies', href: '/case-studies' },
};

export const JOURNEY = {
  openingCaption: 'The crystal opens.',
  transitionCaption: 'The crystal completes.',
  ecosystem: {
    id: 'ecosystem',
    number: '02',
    state: '03',
    kicker: 'Ecosystem',
    title: 'Our Partnership Ecosystem',
    copy: 'Strong partnerships, held in orbit within the crystal.',
  },
};

export const AI_FACTORY = {
  number: '04',
  state: '06',
  kicker: 'AI Factory',
  title: 'AI Factory',
  tagline: 'Industry-ready intelligence, built to deploy.',
  intro:
    'The crystal’s internal structure reorganizes into four industry paths. Each one is production-minded: scoped, engineered and ready to operate inside real workflows.',
};

export const FACTORY_INTRO = {
  kicker: 'What is AI Factory?',
  headline: 'Proven capability, turned into deployable systems.',
  copy: "CalyzaTech's AI Factory turns proven AI capabilities into practical, deployable systems designed around the workflows of specific industries.",
  statementA: 'From foundation',
  statementB: 'to deployment.',
};

/* `color` feeds the crystal's internal quadrant nodes (3D scene, locked). */
export const INDUSTRIES = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    color: '#27C7D9',
    image:
      'https://images.unsplash.com/photo-1719934398679-d764c1410770?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MDV8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwYWJzdHJhY3QlMjBtb2Rlcm58ZW58MHx8fHwxNzg2NjE0NDAxfDA&ixlib=rb-4.1.0&w=1280&q=75',
    imageAlt: 'Modern healthcare environment',
    positioning: 'Care operations that run themselves, with clinicians in command.',
    problems: [
      'Claims backlogs that delay care and cash flow',
      'Documentation that consumes clinical hours',
      'Patients waiting on hold for simple answers',
    ],
    capabilities: [
      { name: 'Claims Automation', detail: 'Documents in, decisions out — claims move without manual relay.' },
      { name: 'Medical Documentation', detail: 'Clinical notes drafted, structured and filed by the system.' },
      { name: 'Patient Support', detail: 'Always-on answers, escalated to humans when it matters.' },
      { name: 'Appointment Intelligence', detail: 'Scheduling that understands urgency, capacity and context.' },
    ],
  },
  {
    id: 'fintech',
    name: 'FinTech',
    color: '#4169FF',
    image:
      'https://images.unsplash.com/photo-1728044849347-ea6ff59d98dd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwzfHxmaW50ZWNoJTIwbW9kZXJufGVufDB8fHx8MTc4NDI0OTYzNnww&ixlib=rb-4.1.0&w=1280&q=75',
    imageAlt: 'Modern financial technology interaction',
    positioning: 'Trust infrastructure that moves at market speed.',
    problems: [
      'Onboarding friction that loses verified customers',
      'Fraud signals buried in transaction noise',
      'Lending decisions slowed by manual review',
    ],
    capabilities: [
      { name: 'KYC Automation', detail: 'Identity, documents and risk checks in one continuous flow.' },
      { name: 'Fraud Detection', detail: 'Patterns surface before losses do.' },
      { name: 'Lending Assistant', detail: 'Applications assessed, packaged and advanced with oversight.' },
      { name: 'Financial Workflow Automation', detail: 'Operations that reconcile, route and report themselves.' },
    ],
  },
  {
    id: 'education',
    name: 'Education',
    color: '#5B1DB8',
    image:
      'https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBidWlsZGluZyUyMG1vZGVybiUyMGFyY2hpdGVjdHVyZXxlbnwwfHx8MTc4MzA5ODM3MHww&ixlib=rb-4.1.0&w=1280&q=75',
    imageAlt: 'Modern educational architecture',
    positioning: 'Learning operations that adapt to every student.',
    problems: [
      'Educators buried in assessment overhead',
      'Students without support outside class hours',
      'Curricula that lag behind outcomes data',
    ],
    capabilities: [
      { name: 'AI Learning Assistant', detail: 'A tutor that adapts to every learner, at any hour.' },
      { name: 'Automated Assessment', detail: 'Grading and feedback without the backlog.' },
      { name: 'Student Support', detail: 'Questions answered, journeys guided, drop-offs caught early.' },
      { name: 'Curriculum Intelligence', detail: 'Content that evolves with outcomes and standards.' },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    color: '#7438D3',
    image:
      'https://images.unsplash.com/photo-1720540244592-b4124532b318?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGludGVyaW9yJTIwaG9zcGl0YWxpdHl8ZW58MHx8fHwxNzg2NjE0NDAxfDA&ixlib=rb-4.1.0&w=1280&q=75',
    imageAlt: 'Luxury hospitality interior',
    positioning: 'Guest experiences that run on anticipation.',
    problems: [
      'Guest requests scattered across channels',
      'Booking changes handled by hand',
      'Service teams reacting instead of anticipating',
    ],
    capabilities: [
      { name: 'Guest Support', detail: 'Every request answered in the guest’s language and tone.' },
      { name: 'Booking Automation', detail: 'Reservations, changes and upgrades handled end to end.' },
      { name: 'Service Operations', detail: 'Housekeeping, kitchen and front desk in one rhythm.' },
      { name: 'Personalized Guest Experience', detail: 'Stays shaped around the guest, not the template.' },
    ],
  },
];

/* Partner tones tint the crystal's refraction on hover and stroke the orbit lines.
   Peach keeps the DOM monochrome while the crystal keeps its internal light. */
export const PARTNERS = {
  kicker: 'Partner Ecosystem',
  headline: 'Powered by world-class AI ecosystems.',
  sub: 'Strong partnerships. Stronger outcomes.',
  companies: [
    { name: 'AWS', id: 'aws', logo: '/partners/aws.svg', tone: '#9A62F5' },
    { name: 'Databricks', id: 'databricks', logo: '/partners/databricks.svg', tone: '#B78CFF' },
    { name: 'OpenAI', id: 'openai', logo: '/partners/openai.svg', tone: '#9A62F5' },
    { name: 'Anthropic', id: 'anthropic', logo: '/partners/anthropic.svg', tone: '#B78CFF' },
  ],
};

export const ACCELERATION_STORY = {
  kicker: 'Partnership Acceleration',
  headline: 'Built at startup speed.',
  headlineAccent: 'Recognized at enterprise level.',
  ringNote: 'One refined ring for every milestone.',
  steps: [
    { id: 'partnership', label: 'AWS Partnership', note: 'The starting point' },
    { id: 'select', label: 'AWS Select Tier', note: 'Approximately 3 months' },
    { id: 'advanced', label: 'AWS Advanced Tier', note: 'Approximately 5 months later' },
    { id: 'genai', label: 'AWS Generative AI Competency', note: 'Within our first year' },
  ],
};

export const SERVICES = [
  {
    id: 'ai-automation',
    number: '01',
    name: 'AI Automation',
    statement:
      'AI systems that execute repetitive and operational workflows — with appropriate human oversight.',
    capabilities: [
      'Workflow automation',
      'Agentic systems',
      'Human-in-the-loop workflows',
      'Operational intelligence',
    ],
  },
  {
    id: 'generative-ai',
    number: '02',
    name: 'Generative AI Platforms',
    statement:
      'Enterprise copilots, knowledge systems, document intelligence and intelligent applications.',
    capabilities: ['RAG systems', 'Enterprise copilots', 'Document intelligence', 'Knowledge assistants'],
  },
  {
    id: 'data-cloud',
    number: '03',
    name: 'Data & Cloud Foundation',
    statement:
      'AI-ready data platforms, scalable infrastructure, analytics and production foundations.',
    capabilities: [
      'Data platforms',
      'Lakehouse architecture',
      'Cloud modernization',
      'MLOps',
      'Analytics foundations',
    ],
  },
];

/* ASSEMBLE THE INTELLIGENCE — conceptual interaction layer per industry.
   Accent pairs per brand direction; labels are conceptual, not per-client claims. */
export const CONTACT_PAGE = {
  kicker: 'Contact',
  headline: 'Ready to build',
  headlineAccent: "what's next?",
  sub: 'Tell us where AI could create the most leverage in your business.',
  note: 'We read everything personally and reply quickly.',
  industries: ['Healthcare', 'FinTech', 'Education', 'Hospitality', 'Other'],
  timelines: ['Exploring', '1–3 months', '3–6 months', 'Immediate'],
  cta: 'Book an AI strategy call',
  secondaryCta: { label: 'Enter AI Factory', href: '/ai-factory' },
};

export const AWS_CREDIBILITY = {
  kicker: 'Achievement',
  badges: [
    {
      src: '/aws-advanced-tier-services-partner.png',
      alt: 'AWS Advanced Tier Services Partner — official badge',
      testId: 'aws-badge-advanced-tier',
    },
    {
      src: '/aws-generative-ai-competency.png',
      alt: 'AWS Generative AI Competency — official badge',
      testId: 'aws-badge-genai',
    },
  ],
  note: 'Achieved within our first year of partnership.',
};
