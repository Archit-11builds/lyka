'use client';
import './ai.css';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { TransitionLink } from '../../components/TransitionLink';
import { useSite } from '../../components/SiteProvider';

const starters = ['What exactly is LYKA?', 'Tell me everything about the rooms.', 'What can I do in LYKA?', 'How does the Secret Hunt work?'];

export default function LykaAI() {
  const path = usePathname();
  const { ghee, cool } = useSite();
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'LYKA AI online. I know the archive, its rooms, systems, games and hunt mechanics. Ask me anything about LYKA.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [backend, setBackend] = useState('checking');
  const endRef = useRef(null);
  const visitorContext = useMemo(() => ({ route: path, ghee, cool, client: 'LYKA web' }), [path, ghee, cool]);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, busy]);

  async function send(raw = input) {
    const value = raw.trim();
    if (!value || busy) return;
    const next = [...messages, { role: 'user', content: value }];
    setMessages(next); setInput(''); setBusy(true);
    try {
      const res = await fetch('/api/lyka-ai', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next, visitorContext }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setBackend('offline'); setMessages((current) => [...current, { role: 'assistant', content: data.error || 'The intelligence layer is offline. Add GEMINI_API_KEY to the deployed server environment.' }]); }
      else { setBackend('online'); setMessages((current) => [...current, { role: 'assistant', content: data.text || 'No signal.' }]); }
    } catch { setBackend('offline'); setMessages((current) => [...current, { role: 'assistant', content: 'Connection lost. The AI route could not be reached.' }]); }
    finally { setBusy(false); }
  }

  return <div className="page lyka-ai-page"><section className="ai-hero"><div><span className="eyebrow">LYKA / INTELLIGENCE LAYER</span><h1>ASK<br /><em>LYKA.</em></h1><p>A private intelligence room for the archive, school questions, coding, ideas and everything in between.</p></div><div className="ai-status"><i className={backend === 'offline' ? 'offline' : ''} /><span>AI CORE / {backend === 'offline' ? 'OFFLINE' : backend === 'online' ? 'ONLINE' : 'CHECKING'}</span><b>PRIVATE ROUTE</b></div></section><section className="ai-shell glass"><div className="ai-topbar"><div className="ai-brand"><div className="ai-orb" aria-hidden="true"><span>LY</span></div><div><span>ANIK.EXE</span><small>LYKA INTELLIGENCE / 032</small></div></div><TransitionLink href="/hq" className="ai-back">RETURN TO HQ ↗</TransitionLink></div><div className="ai-starters">{starters.map((x) => <button key={x} onClick={() => send(x)} disabled={busy}>{x}</button>)}</div><div className="ai-messages">{messages.map((m, i) => <article key={i} className={m.role === 'user' ? 'user' : 'assistant'}><small>{m.role === 'user' ? 'VISITOR' : 'ANIK.EXE / LYKA AI'}</small><p>{m.content}</p></article>)}{busy && <article className="assistant ai-thinking"><small>ANIK.EXE</small><p><i /> <i /> <i /> ANALYSING FIELD DATA…</p></article>}<div ref={endRef} /></div><form className="ai-input" onSubmit={(e) => { e.preventDefault(); send(); }}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything…" maxLength={1000} /><button className="button hot" disabled={busy || !input.trim()}>{busy ? 'THINKING…' : 'SEND ↗'}</button></form><div className="ai-foot"><span>SERVER-SIDE MODEL ACCESS</span><span>LOCAL FALLBACK: STATUS · ROOMS · HUNT · MATHS · ROAST</span></div></section></div>;
}
