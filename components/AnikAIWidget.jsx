'use client';

import { useEffect, useRef, useState } from 'react';

const starters = ['What is LYKA?','Explain all the rooms','Help me with maths','Give me a coding idea'];

export function AnikAIWidget({ route = '/hq', ghee = 78, cool = 0 }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role:'assistant', content:'🐶 Anik AI online. Bol bhai — LYKA ke baare mein ho ya normal question, pooch.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages,busy]);

  async function ask(text) {
    const value = String(text || '').trim();
    if (!value || busy) return;
    const next = [...messages,{role:'user',content:value}];
    setMessages(next); setInput(''); setBusy(true);
    try {
      const res = await fetch('/api/lyka-ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next.slice(-20),visitorContext:{route,ghee,cool,client:'floating-anik-ai'}})});
      const data = await res.json();
      setMessages(prev=>[...prev,{role:'assistant',content:data.text||data.error||'Signal lost. Try again.'}]);
    } catch {
      setMessages(prev=>[...prev,{role:'assistant',content:'Signal lost. Try again in a moment.'}]);
    } finally { setBusy(false); }
  }

  return <div className="anik-ai-widget">
    {open && <section className="anik-ai-window" aria-label="Anik AI">
      <header className="anik-ai-head"><div className="anik-ai-title"><span className="dog">🐶</span><div><b>ANIK AI</b><small>LYKA / GENERAL INTELLIGENCE</small></div></div><button className="anik-ai-close" onClick={()=>setOpen(false)} aria-label="Close Anik AI">×</button></header>
      <div className="anik-ai-chips">{starters.map(item=><button key={item} onClick={()=>ask(item)}>{item}</button>)}</div>
      <div className="anik-ai-messages">
        {messages.map((m,i)=><article key={i} className={'anik-ai-msg '+m.role}><small>{m.role==='user'?'YOU':'ANIK AI'}</small><p>{m.content}</p></article>)}
        {busy && <article className="anik-ai-msg"><small>ANIK AI</small><div className="anik-ai-typing"><i/><i/><i/></div></article>}
        <div ref={endRef}/>
      </div>
      <form className="anik-ai-form" onSubmit={e=>{e.preventDefault();ask(input);}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask anything…" aria-label="Ask Anik AI anything"/><button type="submit" disabled={busy} aria-label="Send">↗</button></form>
      <div className="anik-ai-foot">POWERED BY LYKA AI · SERVER KEY PROTECTED</div>
    </section>}
    <button className="anik-ai-launch" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close Anik AI':'Open Anik AI'}><span className="anik-ai-dog">🐶</span><i className="anik-ai-ping"/></button>
  </div>;
}
