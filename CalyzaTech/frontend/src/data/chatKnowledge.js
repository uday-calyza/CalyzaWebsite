export const GREETING = "Hi. I'm Calyza AI.\nWhat are you looking to build?";

export const QUICK_ACTIONS = [
  { label: 'Explore AI Factory', to: '/ai-factory' },
  { label: 'Find an AI use case', message: 'Which industries do you work with?' },
  { label: 'Explore Services', to: '/services' },
  { label: 'Talk to Calyza', to: '/contact' },
];

const BOOK_CALL = { label: 'Book an AI Strategy Call', to: '/contact' };

const INDUSTRY_RESPONSES = {
  healthcare: {
    text: 'For Healthcare, the AI Factory builds Claims Automation, Medical Documentation, Patient Support and Appointment Intelligence — systems designed around clinical workflows, with humans in command.',
    actions: [{ label: 'Explore Healthcare AI', to: '/ai-factory?industry=healthcare' }, BOOK_CALL],
  },
  fintech: {
    text: 'That points to FinTech. The AI Factory builds KYC Automation, Fraud Detection, Lending Assistant and Financial Workflow Automation — trust infrastructure that moves at market speed.',
    actions: [{ label: 'Explore FinTech AI', to: '/ai-factory?industry=fintech' }, BOOK_CALL],
  },
  education: {
    text: 'For Education, the AI Factory builds an AI Learning Assistant, Automated Assessment, Student Support and Curriculum Intelligence — learning operations that adapt to every student.',
    actions: [{ label: 'Explore Education AI', to: '/ai-factory?industry=education' }, BOOK_CALL],
  },
  hospitality: {
    text: 'For Hospitality, the AI Factory builds Guest Support, Booking Automation, Service Operations and Personalized Guest Experience — service that runs on anticipation.',
    actions: [{ label: 'Explore Hospitality AI', to: '/ai-factory?industry=hospitality' }, BOOK_CALL],
  },
};

export function resolveIntent(raw) {
  const text = raw.toLowerCase();

  if (/(kyc|fraud|lending|bank|financ|payment)/.test(text)) return INDUSTRY_RESPONSES.fintech;
  if (/(health|clinic|patient|claims|medical|care\b|doctor)/.test(text)) return INDUSTRY_RESPONSES.healthcare;
  if (/(educat|student|learn|curriculum|assessment|course|school|universit)/.test(text)) return INDUSTRY_RESPONSES.education;
  if (/(hospitalit|hotel|guest|booking|resort|travel|restaurant)/.test(text)) return INDUSTRY_RESPONSES.hospitality;

  if (/factory/.test(text)) {
    return {
      text: "The AI Factory is CalyzaTech's signature system: it turns proven AI capabilities into deployable, industry-specific solutions across Healthcare, FinTech, Education and Hospitality.",
      actions: [{ label: 'Enter AI Factory', to: '/ai-factory' }],
    };
  }

  if (/(automat|agentic|workflow)/.test(text)) {
    return {
      text: 'AI Automation covers workflow automation, agentic systems, human-in-the-loop workflows and operational intelligence.',
      actions: [{ label: 'Explore Services', to: '/services' }, BOOK_CALL],
    };
  }

  if (/(generative|copilot|rag|document|knowledge|assistant)/.test(text)) {
    return {
      text: 'Generative AI Platforms cover RAG systems, enterprise copilots, document intelligence and knowledge assistants.',
      actions: [{ label: 'Explore Services', to: '/services' }, BOOK_CALL],
    };
  }

  if (/(data|cloud|mlops|lakehouse|infrastructure|analytics)/.test(text)) {
    return {
      text: 'Data & Cloud Foundation covers data platforms, lakehouse architecture, cloud modernization, MLOps and analytics foundations.',
      actions: [{ label: 'Explore Services', to: '/services' }, BOOK_CALL],
    };
  }

  if (/(partner|aws|databricks|openai|anthropic|ecosystem|certif)/.test(text)) {
    return {
      text: 'CalyzaTech builds on AWS, Databricks, OpenAI and Anthropic. On AWS: Select Tier in roughly 3 months, Advanced Tier about 5 months later, and the Generative AI Competency within the first year of partnership.',
      actions: [{ label: 'See the journey', to: '/' }, BOOK_CALL],
    };
  }

  if (/(case|proof|result|client|roi|metric|study)/.test(text)) {
    return {
      text: 'Six documented engagements are live: AI invoice automation on AWS (15–20 minutes of manual work down to 45 seconds–2 minutes), an AI agent for mortgage application processing (2–4 hours to ~2.5 minutes), healthcare document OCR (2–3 hours to under 5 minutes), CAREOPS.AI home health referral extraction, Dasa Holidays’ AWS cloud infrastructure, and the JPP Tech AI chatbot. Which one is closest to your world?',
      actions: [
        { label: 'View Case Studies', to: '/case-studies' },
        { label: 'Mortgage AI Agent', to: '/case-studies/ai-agent-mortgage-application-processing' },
      ],
    };
  }

  if (/(price|pricing|cost|much)/.test(text)) {
    return {
      text: "Engagements are scoped around the workflow and industry, so there's no flat rate card. The fastest way to a real answer is a strategy call.",
      actions: [BOOK_CALL],
    };
  }

  if (/(contact|talk|call|human|someone|speak|book|strategy|email|demo|meeting)/.test(text)) {
    return {
      text: 'The team reads every message personally. Book a strategy call and tell us where AI could create the most leverage in your business.',
      actions: [BOOK_CALL, { label: 'Open Contact', to: '/contact' }],
    };
  }

  if (/(service|what can you|what do you|offer|build)/.test(text)) {
    return {
      text: 'CalyzaTech works across three disciplines: AI Automation, Generative AI Platforms, and Data & Cloud Foundation — and packages them into industry systems through the AI Factory.',
      actions: [{ label: 'Explore Services', to: '/services' }, { label: 'Enter AI Factory', to: '/ai-factory' }],
    };
  }

  if (/(who are you|what is calyza|calyzatech|about)/.test(text)) {
    return {
      text: 'CalyzaTech builds production-grade AI systems that automate work, accelerate decisions and scale enterprise growth. Everything starts inside the crystal — scroll the homepage to see the story.',
      actions: [{ label: 'Enter AI Factory', to: '/ai-factory' }],
    };
  }

  if (/^(hi|hello|hey|yo|good morning|good afternoon|good evening)\b/.test(text)) {
    return { text: 'Hello. I can explain our services, walk you through the AI Factory, or connect you with the team.', actions: [] };
  }

  if (/(industr|use case|which)/.test(text)) {
    return {
      text: 'The AI Factory serves four industries: Healthcare, FinTech, Education and Hospitality. Tell me which one is closest to your world and I will show you what we build there.',
      actions: [
        { label: 'Healthcare', message: 'What can you build for healthcare?' },
        { label: 'FinTech', message: 'What can you build for fintech?' },
        { label: 'Education', message: 'What can you build for education?' },
        { label: 'Hospitality', message: 'What can you build for hospitality?' },
      ],
    };
  }

  return {
    text: "I can help with CalyzaTech's services, the AI Factory industries, our partner ecosystem, or booking a strategy call. What would you like to explore?",
    actions: [
      { label: 'Explore AI Factory', to: '/ai-factory' },
      { label: 'Explore Services', to: '/services' },
      BOOK_CALL,
    ],
  };
}
