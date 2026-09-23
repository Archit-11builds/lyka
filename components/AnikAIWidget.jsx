'use client';

import { useEffect, useRef, useState } from 'react';

const starters = ['What is LYKA?','Show my status','How does the hunt work?','Open Maths Lab'];
const rooms = [['HQ','/hq'],['Roast','/roast'],['Maths','/maths-sir'],['Orbit','/mission'],['Vault','/memes'],['Archive','/archive'],['LMAO','/lmao'],['Live Feed','/live'],['Incident Room','/incidents'],['Photos','/photos']];

export function AnikAIWidget({ route = '/hq', ghee = 78, cool = 0 }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role:'assistant', content:'🐶 ANIK.EXE online. Bol bhai — LYKA ka status, rooms, hunt ya normal question pooch.' }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages,busy]);

  async function ask(text) {
    const value = String(text || '').trim();
    if (!value || busy) return;
    const next = [...messages,{role:'user',content:value}];
    setMessages(next); setInput(''); setBusy(true);

    const normalized = value.toLowerCase();
    let local = null;
    if (normalized === 'status' || normalized.includes('my status')) {
      local = 'LIVE STATUS\\nRoute: ' + route + '\\nGhee: ' + ghee + '%\\nCool events: ' + cool + '\\nSystem: ONLINE';
    } else if (normalized.includes('hunt')) {
      local = 'SECRET HUNT\\n10 hidden field artifacts are scattered across LYKA. Your progress is shown in HUNT in the top bar. Press H to open the hunt panel.';
    } else if (normalized.includes('rooms')) {
      local = 'ROOM INDEX\\n' + rooms.map(function(item){ return '• ' + item[0] + ' — ' + item[1]; }).join('\\n');
    } else if (normalized.includes('maths lab') || normalized.includes('open maths')) {
      local = 'MATHS LAB\\nTimed hard questions, streaks and focus modes live in the Maths room. Use the navigation drawer or open /maths-sir.';
    } else if (normalized === 'help' || normalized.includes('what can you do')) {
      local = 'ANIK.EXE COMMANDS\\nTry: status, rooms, hunt, maths lab, roast, or ask me anything. When the AI backend is connected, I can also answer general questions.';
    } else if (normalized.includes('roast')) {
      local = 'ROAST LAB\\nGo to /roast and hit BAN GAYA COOL. The machine tracks cool events, combo and chaos.';
    }

    if (local) {
      setMessages(function(prev){ return [...prev,{role:'assistant',content:local}]; });
      setBusy(false);
      return;
    }

    try {
      const res = await fetch('/api/lyka-ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next.slice(-20),visitorContext:{route,ghee,cool,client:'floating-anik-ai'}})});
      const data = await res.json();
      const fallback = data.error ? 'ANIK.EXE LOCAL MODE\\nAI backend is not connected yet. I can still help with status, rooms, hunt, maths and roast commands.' : null;
      setMessages(prev=>[...prev,{role:'assistant',content:data.text||fallback||'Signal lost. Try again.'}]);
    } catch {
      setMessages(prev=>[...prev,{role:'assistant',content:'Signal lost. Try again in a moment.'}]);
    } finally { setBusy(false); }
  }

  return <div className="anik-ai-widget">
    {open && <section className="anik-ai-window" aria-label="Anik.exe">
      <header className="anik-ai-head"><div className="anik-ai-title"><span className="dog">🐶</span><div><b>ANIK.EXE</b><small>LYKA / FIELD COMPANION</small></div></div><button className="anik-ai-close" onClick={()=>setOpen(false)} aria-label="Close Anik.exe">×</button></header>
      <div className="anik-ai-chips">{starters.map(item=><button key={item} onClick={()=>ask(item)}>{item}</button>)}</div>
      <div className="anik-ai-messages">
        {messages.map((m,i)=><article key={i} className={'anik-ai-msg '+m.role}><small>{m.role==='user'?'YOU':'ANIK.EXE'}</small><p>{m.content}</p></article>)}
        {busy && <article className="anik-ai-msg"><small>ANIK.EXE</small><div className="anik-ai-typing"><i/><i/><i/></div></article>}
        <div ref={endRef}/>
      </div>
      <form className="anik-ai-form" onSubmit={e=>{e.preventDefault();ask(input);}}><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask anything…" aria-label="Ask Anik.exe anything"/><button type="submit" disabled={busy} aria-label="Send">↗</button></form>
      <div className="anik-ai-foot">POWERED BY LYKA AI · SERVER KEY PROTECTED</div>
    </section>}
    <button className="anik-ai-launch" onClick={()=>setOpen(v=>!v)} aria-label={open?'Close Anik AI':'Open Anik.exe'}><span className="anik-ai-dog">🐶</span><i className="anik-ai-ping"/></button>
  </div>;
}
