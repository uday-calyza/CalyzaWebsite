import { useEffect } from 'react';

const DEFAULTS = {
  title: 'CalyzaTech — The Calyza Crystal',
  description: 'CalyzaTech — The Calyza Crystal. Industry-ready intelligence, built to deploy.',
};

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    const match = selector.match(/\[(name|property)="(.+?)"\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export default function useSeo({ title, description }) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:type"]', 'content', 'article');
    return () => {
      document.title = DEFAULTS.title;
      setMeta('meta[name="description"]', 'content', DEFAULTS.description);
      setMeta('meta[property="og:title"]', 'content', DEFAULTS.title);
      setMeta('meta[property="og:description"]', 'content', DEFAULTS.description);
    };
  }, [title, description]);
}
