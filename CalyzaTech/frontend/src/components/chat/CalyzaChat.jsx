import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GREETING, QUICK_ACTIONS, resolveIntent } from '../../data/chatKnowledge';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ease = [0.16, 1, 0.3, 1];
const INDUSTRY_NAMES = {
  healthcare: 'Healthcare',
  fintech: 'FinTech',
  education: 'Education',
  hospitality: 'Hospitality',
};

function CrystalButtonMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <polygon points="12,2 21,12 12,22 3,12" fill="none" stroke="rgb(var(--accent-primary))" strokeWidth="1.1" />
      <path d="M12 2 L17 12 L12 22 L7 12 Z" fill="none" stroke="rgb(var(--accent-secondary))" strokeWidth="0.6" opacity="0.8" />
      <circle cx="12" cy="12" r="1.6" fill="rgb(var(--accent-primary))" />
    </svg>
  );
}

function getSessionId() {
  try {
    let id = sessionStorage.getItem('calyza-chat-session');
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem('calyza-chat-session', id);
    }
    return id;
  } catch {
    return `anon-${Date.now()}`;
  }
}

/* Pull "ACTION: label | /path" lines out of the model reply and turn them into chips */
function parseActions(text) {
  const actions = [];
  const keep = [];
  text.split('\n').forEach((line) => {
    const m = line.match(/^ACTION:\s*(.+?)\s*\|\s*(\/\S+)\s*$/);
    if (m) actions.push({ label: m[1], to: m[2] });
    else keep.push(line);
  });
  return { clean: keep.join('\n').trim(), actions: actions.slice(0, 3) };
}

const stripActionLines = (text) =>
  text
    .split('\n')
    .filter((l) => !l.trim().startsWith('ACTION:'))
    .join('\n')
    .trim();

export default function CalyzaChat() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'ai', text: GREETING }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [industryCtx, setIndustryCtx] = useState(null);
  const [greetedWithCtx, setGreetedWithCtx] = useState(false);
  const [sessionId] = useState(getSessionId);
  const listRef = useRef(null);

  useEffect(() => {
    const onIndustry = (e) => setIndustryCtx(e.detail);
    window.addEventListener('calyza:industry', onIndustry);
    return () => window.removeEventListener('calyza:industry', onIndustry);
  }, []);

  useEffect(() => {
    if (open && industryCtx && !greetedWithCtx) {
      setGreetedWithCtx(true);
      const name = INDUSTRY_NAMES[industryCtx];
      if (name) {
        setMessages((m) => [
          ...m,
          {
            role: 'ai',
            text: `I see you're exploring ${name}. Want to explore another ${name} AI workflow, or look elsewhere?`,
          },
        ]);
      }
    }
  }, [open, industryCtx, greetedWithCtx]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const patchLast = (patch) =>
    setMessages((m) => {
      const copy = [...m];
      copy[copy.length - 1] = { ...copy[copy.length - 1], ...patch };
      return copy;
    });

  const send = async (raw) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    let acc = '';
    let streaming = false;
    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: text, industry_context: industryCtx || '' }),
      });
      if (!res.ok || !res.body) throw new Error('chat unavailable');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (payload === '[DONE]') break;
          const obj = JSON.parse(payload);
          if (obj.error) throw new Error('stream error');
          if (obj.delta) {
            acc += obj.delta;
            if (!streaming) {
              streaming = true;
              setTyping(false);
              setMessages((m) => [...m, { role: 'ai', text: stripActionLines(acc) }]);
            } else {
              patchLast({ text: stripActionLines(acc) });
            }
          }
        }
      }
      if (!acc.trim()) throw new Error('empty reply');
      const { clean, actions } = parseActions(acc);
      if (!streaming) {
        setTyping(false);
        setMessages((m) => [...m, { role: 'ai', text: clean, actions }]);
      } else {
        patchLast({ text: clean, actions });
      }
    } catch {
      /* Offline / LLM unreachable — degrade gracefully to the curated knowledge engine */
      const { text: reply, actions } = resolveIntent(text);
      if (streaming) patchLast({ text: stripActionLines(acc) || reply, actions });
      else setMessages((m) => [...m, { role: 'ai', text: reply, actions }]);
    } finally {
      setTyping(false);
    }
  };

  const runAction = (action) => {
    if (action.to) navigate(action.to);
    else if (action.message) send(action.message);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        data-testid="chat-toggle"
        aria-label={open ? 'Close Calyza AI' : 'Open Calyza AI'}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease }}
        className="float-slow fixed bottom-6 right-6 z-[70] rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
        style={{ background: 'var(--spectral)' }}
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-calyza-surface p-3">
          <CrystalButtonMark />
          <span className="absolute right-2 top-2 block h-1.5 w-1.5 rounded-full bg-t-acc" />
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[85vh] flex-col rounded-t-2xl border border-calyza-line/10 bg-calyza-surface shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:rounded-2xl"
            data-testid="chat-panel"
            role="dialog"
            aria-label="Calyza AI concierge"
          >
            <div className="flex items-center justify-between border-b border-calyza-line/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <CrystalButtonMark />
                <div>
                  <p className="text-sm font-medium text-calyza-ink">Calyza AI</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-t-acc">Online</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                data-testid="chat-close"
                aria-label="Close chat"
                className="text-t-fg-mut transition-colors hover:text-t-fg"
              >
                ✕
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" data-testid="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-t-btn text-t-btn-text'
                        : 'bg-t-bg-sub text-t-fg'
                    }`}
                    data-testid={`chat-message-${msg.role}-${i}`}
                  >
                    {msg.text.split('\n').map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                    {msg.actions?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.actions.map((action) => (
                          <button
                            key={action.label}
                            onClick={() => runAction(action)}
                            data-testid={`chat-action-${action.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            className="rounded-full border border-calyza-acc/30 px-3 py-1.5 text-[11px] font-medium text-calyza-acc transition-colors duration-200 hover:bg-calyza-acc hover:text-white"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start" data-testid="chat-typing">
                  <div className="flex gap-1.5 rounded-xl bg-t-bg-sub px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="rail-pulse block h-1.5 w-1.5 rounded-full bg-t-acc/60"
                        style={{ animationDelay: `${d * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 px-5 pb-3" data-testid="chat-quick-actions">
                {QUICK_ACTIONS.map((qa) => (
                  <button
                    key={qa.label}
                    onClick={() => runAction(qa)}
                    data-testid={`chat-quick-${qa.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="rounded-full border border-t-border-strong px-3 py-1.5 text-[11px] text-t-fg-sec transition-colors duration-200 hover:border-t-acc hover:text-t-acc"
                  >
                    {qa.label}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-3 border-t border-calyza-line/10 px-5 py-4"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about CalyzaTech…"
                data-testid="chat-input"
                aria-label="Message Calyza AI"
                className="flex-1 bg-transparent text-sm text-t-fg outline-none placeholder:text-t-fg-mut/70"
              />
              <button
                type="submit"
                data-testid="chat-send"
                aria-label="Send message"
                className="text-t-acc transition-transform duration-200 hover:translate-x-0.5 disabled:opacity-30"
                disabled={!input.trim()}
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
