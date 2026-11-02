/* =====================================================================
   AI FACTORY — a premium interactive solution catalogue.
   Three top-level modes only: CASE STUDIES / READY-TO-DEPLOY / USE CASES.
   UNDERSTAND → DECIDE → DEPLOY survives only as a small internal model
   inside a selected solution or use case — never as page navigation.
   Labels are contractual: 'calyza' = documented Calyza solution,
   'blueprint' = research-based ready-to-deploy blueprint. Never blur them.
   No fabricated metrics, clients, or outcomes anywhere in this file.
   ===================================================================== */

export const FACTORY_LAYERS = [
  {
    id: 'understand',
    number: '01',
    label: 'Understand',
    copy: 'Capture and structure the information, documents, context and signals required by the workflow.',
  },
  {
    id: 'decide',
    number: '02',
    label: 'Decide',
    copy: 'Reason over the information using AI, retrieval, rules, scoring, classification or recommendations.',
  },
  {
    id: 'deploy',
    number: '03',
    label: 'Deploy',
    copy: 'Turn the intelligence into an operational system through workflows, agents, integrations and production infrastructure.',
  },
];

/* The small internal model — how Calyza approaches any solution. */
export const MINI_MODEL = {
  understand: 'Documents / context / signals',
  decide: 'Reasoning / rules / recommendations',
  deploy: 'Workflow / integration / production',
};

export const SOLUTION_LABELS = {
  calyza: 'CALYZA SOLUTION',
  blueprint: 'READY-TO-DEPLOY BLUEPRINT',
};

const STATUS = {
  calyza: 'Ready for deployment',
  blueprint: 'Ready to be validated in a pilot',
};

export const FACTORY_MODES = [
  { id: 'case-studies', number: '01', label: 'Case Studies', tagline: 'Proof in production.' },
  { id: 'ready-to-deploy', number: '02', label: 'Ready-to-Deploy', tagline: 'The solution rack.' },
  { id: 'use-cases', number: '03', label: 'Use Cases', tagline: 'The capability matrix.' },
];

export const FACTORY_PAGE = {
  heroSub: 'A system for turning business workflows into deployable AI solutions.',
  ctaKicker: 'AI Factory',
  ctaHeadline: 'Ready to build',
  ctaHeadlineAccent: "what's next?",
  ctaSub: 'Take an industry workflow from opportunity to production with CalyzaTech.',
  ctaPrimary: 'Build with Calyza →',
  ctaSecondary: 'Contact us',
};

/* Per-industry factory-floor identity: narrative line + the INPUT →
   INTELLIGENCE → OUTCOME system vocabulary. Atmosphere accents only. */
export const FACTORY_FLOOR = {
  healthcare: {
    number: '01',
    tagline: 'AI systems designed around the workflows of modern healthcare.',
    narrative: {
      input: 'Patient / clinical / claims information',
      intelligence: 'Clinical and workflow intelligence',
      outcome: 'Ready-to-deploy healthcare workflow',
    },
  },
  fintech: {
    number: '02',
    tagline: 'AI systems designed around the workflows of modern finance.',
    narrative: {
      input: 'Financial / policy / customer information',
      intelligence: 'Grounded financial reasoning + rules',
      outcome: 'Production financial workflow',
    },
  },
  education: {
    number: '03',
    tagline: 'AI systems designed around the workflows of modern learning.',
    narrative: {
      input: 'Student / course / learning information',
      intelligence: 'Personalized learning intelligence',
      outcome: 'Student / educator workflow',
    },
  },
  hospitality: {
    number: '04',
    tagline: 'AI systems designed around the workflows of modern hospitality.',
    narrative: {
      input: 'Guest / booking / service information',
      intelligence: 'Context-aware guest intelligence',
      outcome: 'Connected guest workflow',
    },
  },
};

/* Which documented case-study industries belong to each factory floor.
   Education has no verified Calyza case study yet — honest in-progress state. */
export const FACTORY_CASE_MAP = {
  healthcare: ['Healthcare'],
  fintech: ['Financial Services', 'FinTech'],
  education: [],
  hospitality: ['Travel & Hospitality'],
};

/* ---- Ready-to-deploy catalogue (documented Calyza solutions + labelled blueprints) ---- */
export const FACTORY_INDUSTRIES = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    accent: ['#27C7D9', '#67D8B0'],
    solutions: [
      {
        id: 'claimkavach',
        name: 'ClaimKavach',
        title: 'Pre-Submission Claims Intelligence',
        label: 'calyza',
        status: STATUS.calyza,
        value: "Checks a hospital's scanned claim packet before submission and surfaces issues while they can still be corrected.",
        problem:
          'Hospital claim packets are still assembled by hand. Missing documents, reused images, submission-window problems and unsupported package codes surface only after submission — as rejections and rework.',
        understand: ['Claim packet', 'Clinical documents', 'Scheme requirements'],
        decide: ['Document completeness', 'Submission-window validation', 'Package/document consistency', 'Rule-based findings'],
        deploy: ['Pre-submission review', 'Findings for the hospital coordinator', 'Human correction before submission'],
        workflow: [
          'Claim packet scanned and ingested',
          'Completeness, consistency and window checks',
          'Rule-based findings flagged',
          'Hospital coordinator reviews and corrects',
          'Hospital submits the corrected packet',
        ],
        useCases: ['Pre-submission review', 'Missing-document detection', 'Reused-image flags', 'Window validation'],
        whoUses: ['Hospital claim coordinators', 'Billing & RCM teams'],
        outcome: 'Issues are surfaced to the hospital coordinator before submission, while they can still be corrected.',
        note: 'ClaimKavach does not submit claims on behalf of the hospital.',
      },
      {
        id: 'vaidya-ai',
        name: 'Vaidya AI',
        title: 'AI Pre-Consultation Assistant',
        label: 'calyza',
        status: STATUS.calyza,
        value: 'Talks with patients before consultation and hands the doctor a concise, structured summary before the visit.',
        problem:
          'Consultation time is consumed by intake. Symptoms, history, medicines, allergies and recent tests arrive unstructured — or not at all.',
        understand: ['Patient symptoms', 'History', 'Medicines', 'Allergies', 'Recent tests'],
        decide: ['Adaptive specialty-aware questioning', 'Relevant information prioritization'],
        deploy: ['Patient conversation', 'Structured doctor summary', 'Hospital workflow handoff'],
        workflow: [
          'Patient conversation before the visit',
          'Adaptive, specialty-aware questioning',
          'Information structured and prioritized',
          'Concise summary delivered to the doctor',
          'Handoff into the hospital workflow',
        ],
        useCases: ['Pre-consultation intake', 'Structured doctor summary', 'Workflow handoff'],
        whoUses: ['Front-desk & triage teams', 'Doctors before consultation'],
        outcome: 'The doctor receives a concise, structured summary before the visit begins.',
        note: 'Vaidya AI gathers, organizes and prepares. It does not diagnose, prescribe or replace doctors.',
      },
      {
        id: 'clinical-document-prior-auth-copilot',
        name: 'Clinical Document & Prior-Authorization Copilot',
        title: 'Evidence-Matched Review Workspace',
        label: 'blueprint',
        status: STATUS.blueprint,
        value: 'Reads clinical documents and prior-authorization records, matches evidence and prepares the case for a human reviewer.',
        problem:
          'Prior-authorization cases drown reviewers in documents. Missing evidence and scattered records turn every case into a manual excavation.',
        understand: ['Clinical documents', 'Prior-authorization records', 'Medical evidence'],
        decide: ['Missing-document detection', 'Case summarization', 'Evidence matching', 'Reviewer assistance'],
        deploy: ['Reviewer workspace', 'Document workflow', 'Human approval'],
        workflow: [
          'Case documents ingested and classified',
          'Missing documents and evidence gaps detected',
          'Case summarized with matched evidence',
          'Reviewer decides in a dedicated workspace',
        ],
        useCases: ['Prior-auth review', 'Evidence matching', 'Case summarization'],
        whoUses: ['Prior-authorization reviewers', 'Clinical documentation teams'],
        outcome: 'Designed for deployment. Ready to be validated in a pilot.',
        note: 'A ready-to-deploy blueprint inspired by established healthcare AI patterns.',
      },
    ],
  },
  {
    id: 'fintech',
    name: 'FinTech',
    accent: ['#4169FF', '#5B1DB8'],
    solutions: [
      {
        id: 'policy-copilot',
        name: 'Policy Copilot',
        title: 'Your Credit Policy, Answerable in Seconds.',
        label: 'calyza',
        status: STATUS.calyza,
        value: 'Answers credit-policy questions with every substantive answer tied to the governing clause and policy version.',
        problem:
          'Credit policy lives in dense documents, eligibility matrices, exceptions and versions. Relationship managers and credit officers lose hours hunting for the governing clause.',
        understand: ['Policy documents', 'Eligibility matrices', 'Exceptions', 'Policy versions'],
        decide: ['Clause-level retrieval', 'Eligibility reasoning', 'Structured decision support', 'Role-based responses'],
        deploy: ['Relationship-manager workflow', 'Credit workflow', 'Evidence-linked answers'],
        workflow: [
          'Policy corpus versioned and indexed',
          'Question matched to governing clauses',
          'Answer drafted with evidence links',
          'Role-appropriate response delivered in workflow',
        ],
        useCases: ['Policy Q&A', 'Eligibility checks', 'Exception lookup'],
        whoUses: ['Relationship managers', 'Credit officers'],
        outcome: 'Every substantive answer is tied to the governing clause and the relevant policy version.',
      },
      {
        id: 'rbi-regtech',
        name: 'RBI RegTech',
        title: 'Find the Exception Before the Inspection Does.',
        label: 'calyza',
        status: STATUS.calyza,
        value: 'Evaluates the full book against deterministic rules drawn from RBI circulars, master directions and institutional policy.',
        problem:
          'Regulatory expectations shift circular by circular. Exceptions hide in the book until an inspection finds them first.',
        understand: ['RBI circulars', 'Master directions', 'Institution policies', 'Account data'],
        decide: ['Deterministic compliance rules', 'Change-impact analysis', 'Exception identification', 'Backtesting'],
        deploy: ['Full-book evaluation', 'Evidence-backed findings', 'Reviewer workflow', 'Point-in-time replay'],
        workflow: [
          'Circulars and directions encoded as deterministic rules',
          'Full book evaluated, point-in-time',
          'Exceptions flagged with evidence',
          'Human reviewer adjudicates every finding',
          'Replayable audit trail retained',
        ],
        useCases: ['Exception detection', 'Change-impact analysis', 'Backtesting & replay'],
        whoUses: ['Compliance teams', 'Internal audit'],
        outcome: 'Full-book evaluation with evidence-backed findings and point-in-time replay.',
        note: 'The rule decides. The model drafts and explains. Findings always go to human reviewers — no compliance outcome is guaranteed.',
      },
      {
        id: 'kyc-lending-intelligence',
        name: 'KYC & Lending Intelligence',
        title: 'Onboarding to Credit Decision, Orchestrated',
        label: 'blueprint',
        status: STATUS.blueprint,
        value: 'Verifies identity, assesses risk and orchestrates the credit workflow with missing-information detection built in.',
        problem:
          'Onboarding friction loses verified customers while manual review slows lending decisions and buries risk signals.',
        understand: ['Identity documents', 'Income information', 'Application data', 'Customer context'],
        decide: ['KYC verification', 'Risk assessment', 'Credit workflow orchestration', 'Missing-information detection'],
        deploy: ['Digital onboarding', 'Document workflow', 'Credit decision workflow', 'Customer notifications'],
        workflow: [
          'Documents captured in digital onboarding',
          'KYC verification and risk assessment',
          'Missing information requested automatically',
          'Credit workflow advanced with oversight',
          'Customer notified at every step',
        ],
        useCases: ['Digital onboarding', 'Risk assessment', 'Credit workflow'],
        whoUses: ['Onboarding teams', 'Lending operations'],
        outcome: 'Designed for deployment. Ready to be validated in a pilot.',
        note: 'A ready-to-deploy blueprint supported by established financial-services AI patterns — KYC, document intelligence, fraud detection and credit decisioning.',
      },
    ],
  },
  {
    id: 'education',
    name: 'Education',
    accent: ['#5B1DB8', '#8A4DE8'],
    solutions: [
      {
        id: 'ai-learning-companion',
        name: 'AI Learning Companion',
        title: 'A Tutor That Adapts to Every Learner',
        label: 'blueprint',
        status: STATUS.blueprint,
        value: 'Gives every student course-aware, personalized explanations and a learning path that adapts to their gaps.',
        problem:
          'Students need support outside class hours; educators cannot personalize for every learner at once.',
        understand: ['Student profile', 'Course content', 'Learning history', 'Academic context'],
        decide: ['Personalized explanations', 'Learning-path recommendations', 'Knowledge-gap identification'],
        deploy: ['Student assistant', 'Course-aware Q&A', 'Personalized learning journey'],
        workflow: [
          'Student profile and history understood',
          'Gaps identified against course goals',
          'Explanations and path personalized',
          'Educator sees progress and intervenes',
        ],
        useCases: ['Course-aware Q&A', 'Learning paths', 'Gap detection'],
        whoUses: ['Students', 'Educators & academic teams'],
        outcome: 'Designed for deployment. Ready to be validated in a pilot.',
        note: 'Designed with human educator oversight at every step.',
      },
      {
        id: 'assessment-feedback-engine',
        name: 'Assessment & Feedback Engine',
        title: 'Assessment Support with Educator Review',
        label: 'blueprint',
        status: STATUS.blueprint,
        value: 'Drafts rubric-based evaluation and feedback so educators review instead of assemble.',
        problem:
          'Assessment overhead buries educators; feedback arrives too late to change outcomes.',
        understand: ['Assignments', 'Responses', 'Rubrics', 'Course material'],
        decide: ['Assessment support', 'Rubric-based evaluation', 'Feedback generation', 'Learning-gap detection'],
        deploy: ['Teacher review', 'Student feedback', 'Performance insights'],
        workflow: [
          'Responses collected against rubrics',
          'Evaluation and feedback drafted',
          'Teacher reviews and approves',
          'Feedback released with performance insights',
        ],
        useCases: ['Rubric-based feedback', 'Teacher review', 'Performance insights'],
        whoUses: ['Teachers & faculty', 'Academic coordinators'],
        outcome: 'Designed for deployment. Ready to be validated in a pilot.',
        note: 'Never autonomous grading — every evaluation passes educator review.',
      },
      {
        id: 'student-services-copilot',
        name: 'Student Services Copilot',
        title: 'Routine Requests Resolved, Judgment Escalated',
        label: 'blueprint',
        status: STATUS.blueprint,
        value: 'Resolves routine student requests across admissions, enrollment, financial aid and registration — and escalates what needs human judgment.',
        problem:
          'Student service desks drown in routine requests while complex cases wait in the same queue.',
        understand: ['Student request', 'Enrollment context', 'Academic/admin records'],
        decide: ['Intent classification', 'Next-best action', 'Workflow routing'],
        deploy: ['Admissions', 'Enrollment', 'Financial-aid support', 'Course-registration support', 'Student service workflows'],
        workflow: [
          'Request understood with student context',
          'Intent classified, next-best action chosen',
          'Routine requests resolved directly',
          'Judgment cases routed to the right human',
        ],
        useCases: ['Admissions support', 'Enrollment & aid', 'Registration help'],
        whoUses: ['Student service desks', 'Admissions teams'],
        outcome: 'Designed for deployment. Ready to be validated in a pilot.',
        note: 'The assistant resolves routine requests and escalates cases requiring human judgment.',
      },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    accent: ['#7438D3', '#E99AC2'],
    solutions: [
      {
        id: 'digital-concierge',
        name: 'Digital Concierge',
        title: 'A Concierge in Every Conversation',
        label: 'blueprint',
        status: STATUS.blueprint,
        value: 'Conversational guest support with personalized recommendations, service requests and well-timed upsell opportunities.',
        problem:
          'Guests expect instant, personal service at any hour; front-office teams cannot be everywhere at once.',
        understand: ['Guest profile', 'Booking context', 'Preferences', 'Conversation history'],
        decide: ['Intent', 'Recommendation', 'Service priority'],
        deploy: ['Guest support', 'Personalized recommendations', 'Service requests', 'Upsell opportunities'],
        workflow: [
          'Guest speaks — conversation is the interface',
          'Intent and priority understood in context',
          'Request fulfilled or routed to staff',
          'Recommendations and upsells timed to the stay',
        ],
        useCases: ['Guest support', 'Recommendations', 'Service requests'],
        whoUses: ['Guests', 'Front-office teams'],
        outcome: 'Designed for deployment. Ready to be validated in a pilot.',
        note: 'Conversational AI is the primary interface; staff step in whenever it matters.',
      },
      {
        id: 'booking-journey-agent',
        name: 'Booking & Journey Agent',
        title: 'Before, During and After the Booking',
        label: 'blueprint',
        status: STATUS.blueprint,
        value: 'Assists the full guest journey — destination, dates, budget and preferences in; bookings, changes and post-booking care out.',
        problem:
          'Booking journeys fragment across channels; changes and cancellations consume staff time that should go to guests.',
        understand: ['Destination', 'Dates', 'Budget', 'Preferences'],
        decide: ['Recommendation', 'Availability', 'Journey selection'],
        deploy: ['Booking assistance', 'Reservation support', 'Changes', 'Cancellations', 'Post-booking assistance'],
        workflow: [
          'Guest intent captured — destination, dates, budget',
          'Options recommended against availability',
          'Booking completed with support',
          'Changes, cancellations and care handled after',
        ],
        useCases: ['Booking assistance', 'Changes & cancellations', 'Post-booking care'],
        whoUses: ['Guests', 'Reservations teams'],
        outcome: 'Designed for deployment. Ready to be validated in a pilot.',
        note: 'The agent supports the guest journey before, during and after booking.',
      },
      {
        id: 'hospitality-document-intelligence',
        name: 'Hospitality Document Intelligence',
        title: 'Back Office, Automated',
        label: 'blueprint',
        status: STATUS.blueprint,
        value: 'Classifies, extracts, validates and routes bookings, invoices, guest IDs, feedback and travel documents.',
        problem:
          'Back-office document work steals time from guest service and lets errors travel downstream.',
        understand: ['Bookings', 'Invoices', 'Guest IDs', 'Feedback', 'Travel documents'],
        decide: ['Classification', 'Extraction', 'Validation', 'Routing'],
        deploy: ['Back-office processing', 'Guest-service workflows', 'Document automation'],
        workflow: [
          'Documents arrive from every channel',
          'Classified, extracted and validated',
          'Exceptions routed to the right desk',
          'Clean data flows into operations',
        ],
        useCases: ['Invoice processing', 'Guest ID validation', 'Feedback routing'],
        whoUses: ['Back-office operations', 'Guest services'],
        outcome: 'Designed for deployment. Ready to be validated in a pilot.',
        note: 'A deployment-ready blueprint, not an existing Calyza case study.',
      },
    ],
  },
];

/* ---- Mode 03 — what we can build per industry (capability framing, no deployment claims) ---- */
export const USE_CASES = {
  healthcare: [
    { name: 'Claims intelligence', desc: 'Claim packets checked for completeness, consistency and submission windows before they go out.' },
    { name: 'Pre-consultation', desc: 'Structured patient intake conversations, summarized for the doctor before the visit.' },
    { name: 'Clinical document intelligence', desc: 'Clinical documents classified, extracted and routed to the right workflow.' },
    { name: 'Patient support', desc: 'Always-on answers for patients, escalated to humans when it matters.' },
    { name: 'Prior-authorization workflows', desc: 'Authorization cases prepared with matched evidence for human reviewers.' },
  ],
  fintech: [
    { name: 'KYC workflows', desc: 'Identity, documents and risk checks in one continuous flow.' },
    { name: 'Credit-policy assistance', desc: 'Policy questions answered against the governing clause and version.' },
    { name: 'Regulatory monitoring', desc: 'Circulars encoded as deterministic rules; exceptions surfaced for review.' },
    { name: 'Fraud workflows', desc: 'Patterns surfaced before losses, routed to investigators with evidence.' },
    { name: 'Lending intelligence', desc: 'Applications assessed, packaged and advanced with human oversight.' },
  ],
  education: [
    { name: 'AI learning assistants', desc: 'Course-aware help that adapts to each learner, at any hour.' },
    { name: 'Assessment support', desc: 'Rubric-based evaluation drafts with educator review before release.' },
    { name: 'Student services', desc: 'Routine requests resolved; judgment cases escalated to staff.' },
    { name: 'Knowledge assistants', desc: 'Institutional knowledge, answerable in plain language.' },
    { name: 'Curriculum intelligence', desc: 'Content that evolves with outcomes and standards.' },
  ],
  hospitality: [
    { name: 'Digital concierge', desc: 'Conversational guest service with recommendations and requests.' },
    { name: 'Booking assistance', desc: 'Search, book, change and cancel in one continuous flow.' },
    { name: 'Guest support', desc: 'Always-on guest answers with staff escalation paths.' },
    { name: 'Service workflows', desc: 'Housekeeping, kitchen and front desk kept in one rhythm.' },
    { name: 'Document intelligence', desc: 'Bookings, invoices, IDs and feedback processed automatically.' },
  ],
};

export const getFactoryIndustry = (id) =>
  FACTORY_INDUSTRIES.find((i) => i.id === id) || FACTORY_INDUSTRIES[0];

export const getFactorySolution = (solutionId) => {
  for (const industry of FACTORY_INDUSTRIES) {
    const solution = industry.solutions.find((s) => s.id === solutionId);
    if (solution) return { industry, solution };
  }
  return null;
};
