import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const sections = [
  {
    number: '01',
    title: 'Introduction',
    body: `CalyzaTech ("we," "us," or "our") is committed to protecting the privacy of anyone who visits our website or contacts us with an inquiry. This Privacy Statement explains what personal information we collect, how we use it, and what we do not do with it.\n\nWe do not sell, rent, share, or disclose your personal information to any third party for commercial or marketing purposes.`,
  },
  {
    number: '02',
    title: 'Who This Statement Applies To',
    list: [
      'Visitors to our website at calyzatech.com',
      'Anyone who submits an inquiry or contact form on our website',
      'Anyone who interacts with the Calyza AI chat assistant on our website',
      'Anyone who discovers us through YouTube or other platforms and subsequently visits our website',
    ],
  },
  {
    number: '03',
    title: 'Information We Collect',
    body: `When you submit an inquiry through our contact form, we collect:`,
    table: [
      { field: 'Name', purpose: 'To address you personally in our response' },
      { field: 'Email address', purpose: 'To reply to your inquiry' },
      { field: 'Company name', purpose: 'To understand your organisation and context (optional)' },
      { field: 'Industry', purpose: 'To route your inquiry to the right team (optional)' },
      { field: 'Project timeline', purpose: 'To understand urgency and scope (optional)' },
      { field: 'Message', purpose: 'The content of your inquiry' },
    ],
    bodyAfter: `We may also automatically collect limited technical information when you visit our website, including IP address (for security only), browser type, pages visited, and referring URL (e.g. a YouTube video link that brought you here).\n\nWe do not collect any payment information, government IDs, or sensitive personal data.`,
  },
  {
    number: '04',
    title: 'How We Use Your Information',
    body: `We use the information you provide only to:`,
    numbered: [
      'Respond to your inquiry — your details are used by our team to understand your needs and get back to you.',
      'Send you a confirmation — after submitting the contact form, you may receive an acknowledgment from us.',
      'Improve our services — we may review inquiry trends in aggregate (no individual data) to understand what clients need.',
    ],
    bodyAfter: `We will never use your information for unsolicited marketing without your explicit consent.`,
  },
  {
    number: '05',
    title: 'AI Chat Assistant and AI Processing',
    body: `Our website includes Calyza AI, an intelligent chat assistant powered by a large language model (LLM).\n\nWhen you use Calyza AI:`,
    list: [
      'Your messages and a session identifier are collected to maintain conversation continuity during your visit',
      'Conversation content may be processed by our AI provider\'s infrastructure to generate responses',
      'Messages are stored in our database for service improvement purposes',
      'We do not use your chat conversations to train AI models without your explicit consent',
      'No personally identifiable information from your chat is shared with third parties for commercial purposes',
    ],
  },
  {
    number: '06',
    title: 'Cookies and Analytics',
    body: `Our website uses cookies and analytics tools to understand how visitors interact with our content.`,
    subsections: [
      {
        label: 'What we use',
        items: [
          'Essential cookies — required for the website to function correctly (session management, security)',
          'Analytics cookies — used to understand traffic patterns such as pages visited, session duration, and referral sources (e.g. YouTube)',
        ],
      },
      {
        label: 'What we do not do',
        items: [
          'We do not use advertising or retargeting cookies',
          'We do not build personal profiles for cross-site tracking',
          'We do not sell cookie data to any third party',
        ],
      },
    ],
    bodyAfter: `You can control cookies through your browser settings at any time.`,
  },
  {
    number: '07',
    title: 'Data Retention',
    body: `We retain your personal information only for as long as necessary to fulfil the purposes for which it was collected, including responding to inquiries, providing our services, and meeting applicable legal requirements.\n\nRetention periods depend on the nature of the information, the purpose of processing, and applicable legal obligations.\n\nWhere appropriate, we may anonymise or aggregate information so it can no longer be associated with you. Such information may be retained for analytical and service improvement purposes.\n\nWhen personal information is no longer required, we take reasonable steps to securely delete or anonymise it.`,
  },
];

export default function PrivacyPage() {
  return (
    <div
      className="relative overflow-hidden bg-t-bg px-6 pb-32 pt-40 text-t-fg transition-colors duration-500 md:px-14 md:pt-48"
      data-testid="privacy-page"
    >
      <div className="drift-layer pointer-events-none absolute -inset-1/3 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1600px]">
        {/* ---- Hero header ---- */}
        <motion.header
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl"
        >
          <p className="mb-5 font-mono text-[11px] font-normal uppercase tracking-[0.3em] text-t-acc">
            Legal
          </p>
          <h1 className="font-display text-5xl font-light leading-[1.02] tracking-tighter text-t-fg sm:text-6xl lg:text-7xl">
            Privacy{' '}
            <span className="italic text-t-acc">Statement</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-t-fg-sec">
            We take your privacy seriously. Here is exactly what we collect when you reach out to us, how we use it, and your rights over it.
          </p>
        </motion.header>

        {/* ---- Sections ---- */}
        <div className="mt-20">
          {sections.map((s, i) => (
            <motion.section
              key={s.number}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.12 + i * 0.07 }}
              className="py-12"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                {/* Number + title */}
                <div className="lg:col-span-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-t-fg-mut">
                    {s.number}
                  </p>
                  <h2 className="mt-3 font-display text-2xl font-light tracking-tight text-t-fg sm:text-3xl">
                    {s.title}
                  </h2>
                </div>

                {/* Content */}
                <div className="space-y-5 lg:col-span-8">
                  {s.body && (
                    <div className="space-y-4">
                      {s.body.split('\n\n').map((para, pi) => (
                        <p key={pi} className="text-sm leading-relaxed text-t-fg-sec">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {s.list && (
                    <ul className="space-y-3">
                      {s.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-t-fg-sec">
                          <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-t-acc" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.table && (
                    <div className="overflow-x-auto rounded border border-t-border">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-t-border">
                            <th className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-t-fg-mut">
                              {s.number === '08' ? 'Type' : 'Field'}
                            </th>
                            <th className="px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-t-fg-mut">
                              {s.number === '08' ? 'Retention Period' : 'Purpose'}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {s.table.map((row, ri) => (
                            <tr key={row.field} className={ri % 2 === 0 ? 'bg-t-surface' : 'bg-transparent'}>
                              <td className="px-5 py-3 font-medium text-t-fg">{row.field}</td>
                              <td className="px-5 py-3 text-t-fg-sec">{row.purpose}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {s.subsections && s.subsections.map((sub) => (
                    <div key={sub.label} className="space-y-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-t-fg-mut">
                        {sub.label}
                      </p>
                      <ul className="space-y-2">
                        {sub.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-t-fg-sec">
                            <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-t-acc" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {s.numbered && (
                    <ol className="space-y-3">
                      {s.numbered.map((item, ni) => (
                        <li key={ni} className="flex items-start gap-3 text-sm leading-relaxed text-t-fg-sec">
                          <span className="mt-[2px] shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-t-acc">
                            {String(ni + 1).padStart(2, '0')}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  )}

                  {s.bodyAfter && (
                    <div className="space-y-4">
                      {s.bodyAfter.split('\n\n').map((para, pi) => (
                        <p key={pi} className="text-sm leading-relaxed text-t-fg-sec">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
