'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TransitionLink } from '../../components/TransitionLink';
import { useSite } from '../../components/SiteProvider';

const starters = [
  'What exactly is LYKA?',
  'Tell me everything about the rooms.',
  'What can I do in LYKA?',
  'How does the Secret Hunt work?',
];

export default function LykaAI() {
  const path = usePathname();
  const { ghee, cool } = useSite();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'LYKA AI online. I know the archive, its rooms, systems, games and hunt mechanics. Ask me anything about LYKA.' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  const visitorContext = useMemo(() => ({
    route: path,
    ghee,
    cool,
    client: 'LYKA web',
  }), [path, ghee, cool]);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, busy]);

  async function send(raw = input) {
    const value = raw.trim();
    if (!value || busy) return;
    const next = [...messages, { role: 'user', content: value }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const res = await fetch('/api/lyka-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, visitorContext }),
      });
      const data = await res.json();
      setMessages((current) => [...current, { role: 'assistant', content: data.text || data.error || 'No signal.' }]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: 'Connection lost. LYKA AI could not reach its intelligence layer.' }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page lyka-ai-page">
      <section className="ai-hero">
        <div>
          <span className="eyebrow">LYKA / INTELLIGENCE LAYER</span>
          <h1>ASK<br /><em>LYKA.</em></h1>
          <p>A custom AI trained with the site's own canon — rooms, systems, games, secrets and the unnecessarily detailed history of the archive.</p>
        </div>
        <div className="ai-status">
          <i /><span>AI CORE / ONLINE</span><b>PRIVATE ROUTE</b>
        </div>
      </section>

      <section className="ai-shell glass">
        <div className="ai-topbar">
          <div><span>LYKA AI</span><small>FIELD INTELLIGENCE / 032</small></div>
          <TransitionLink href="/hq" className="ai-back">RETURN TO HQ ↗</TransitionLink>
        </div>

        <div className="ai-starters">
          {starters.map((x) => <button key={x} onClick={() => send(x)} disabled={busy}>{x}</button>)}
        </div>

        <div className="ai-messages">
          {messages.map((m, i) => (
            <article key={i} className={m.role === 'user' ? 'user' : 'assistant'}>
              <small>{m.role === 'user' ? 'VISITOR' : 'LYKA AI'}</small>
              <p>{m.content}</p>
            </article>
          ))}
          {busy && <article className="assistant ai-thinking"><small>LYKA AI</small><p><i /> <i /> <i /> ANALYSING FIELD DATA…</p></article>}
          <div ref={endRef} />
        </div>

        <form className="ai-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about LYKA…" maxLength={1000} />
          <button className="button hot" disabled={busy || !input.trim()}>{busy ? 'THINKING…' : 'SEND ↗'}</button>
        </form>
        <div className="ai-foot"><span>MODEL ACCESS VIA SERVER ROUTE</span><span>API KEY NEVER SHIPPED TO THE BROWSER</span></div>
      </section>
    </div>
  );
}
