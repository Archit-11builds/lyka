'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSite } from './SiteProvider';
import { TransitionLink } from './TransitionLink';
import { GlobalFX } from './GlobalFX';
import { Danger } from './Danger';
import { sixQuestions } from '../lib/data';

const links = [
  ['/hq', 'HQ'], ['/roast', 'Roast'], ['/maths-sir', 'Maths'],
  ['/mission', 'Orbit'], ['/memes', 'Vault'], ['/archive', 'Archive'],
];
const allLinks = [...links, ['/ai', 'LYKA AI'], ['/chaos', 'Chaos'], ['/iq', 'Anik IQ'], ['/live', 'Live Feed'], ['/incidents', 'Incident Room'], ['/lmao', 'LMAO Lab'], ['/photos', 'Photos'], ['/about', 'About']];

export function Shell({ children }) {
  const path = usePathname();
  const { ghee, six, setSix } = useSite();
  const [menu, setMenu] = useState(false);
    const [step, setStep] = useState(0);
  const [q, setQ] = useState(() => sixQuestions[Math.floor(Math.random() * sixQuestions.length)]);
  const [msg, setMsg] = useState('');
  const [hunt, setHunt] = useState([]);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [huntPanel, setHuntPanel] = useState(false);
  const [huntToast, setHuntToast] = useState('');
  const [huntCelebration, setHuntCelebration] = useState(null); const [searchOpen,setSearchOpen]=useState(false); const [search,setSearch]=useState(''); const [endgame,setEndgame]=useState(false);

  useEffect(() => {
    try { setHunt(JSON.parse(localStorage.getItem('lyka-hunt') || '[]')); } catch {}
    try { if (localStorage.getItem('lyka-update-seen') !== '1') setUpdateOpen(true); } catch { setUpdateOpen(true); }
    document.body.classList.toggle('locked', six);
    return () => document.body.classList.remove('locked');
  }, [six]);

  useEffect(() => {
    const key = (e) => {
      if (!six && (e.key === 'h' || e.key === 'H')) {
        const tag = document.activeElement?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') setHuntPanel(v => !v);
      }
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, [six]);

  useEffect(() => {
    if (!six) return;
    const lock = () => history.pushState({ six: true }, '', location.href);
    history.pushState({ six: true }, '', location.href);
    addEventListener('popstate', lock);
    const key = (e) => {
      if (e.key === 'Escape' || (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight'))) {
        e.preventDefault();
        e.stopPropagation();
        history.pushState({ six: true }, '', location.href);
      }
    };
    addEventListener('keydown', key, true);
    const before = (e) => {
      e.preventDefault();
      e.returnValue = 'LYKA SIX MODE is still active.';
    };
    addEventListener('beforeunload', before);
    document.body.classList.add('six-locked');
    return () => {
      removeEventListener('popstate', lock);
      removeEventListener('keydown', key, true);
      removeEventListener('beforeunload', before);
      document.body.classList.remove('six-locked');
    };
  }, [six]);

  const playSixWarning = () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
      master.connect(ctx.destination);
      [440, 330, 220].forEach((freq, i) => {
        const start = now + i * 0.16;
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.08, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start(start);
        oscillator.stop(start + 0.2);
      });
      window.setTimeout(() => ctx.close(), 900);
    } catch (error) {
      // Audio is optional.
    }
  };

  const revealSecret = (index) => {
    if (hunt.includes(index) || index < 0 || index > 9) return;
    const next = [...hunt, index];
    setHunt(next);
    try { localStorage.setItem('lyka-hunt', JSON.stringify(next)); } catch {}
    const remaining = 10 - next.length;
    setHuntToast(next.length === 10 ? 'ALL 10 FOUND — ₹100 REWARD UNLOCKED' : 'SECRET ' + (index + 1) + ' FOUND — ' + remaining + ' REMAINING');
    setHuntCelebration({ index, final: next.length === 10 });
    window.setTimeout(() => setHuntToast(''), 2600);
    window.setTimeout(() => setHuntCelebration(null), 2100);
    window.dispatchEvent(new CustomEvent('lyka:secret', { detail: { index, remaining } }));
  };

  useEffect(()=>{ if(hunt.length===10){setEndgame(true)} },[hunt.length]);

  const closeUpdate = () => {
    setUpdateOpen(false);
    try { localStorage.setItem('lyka-update-seen', '1'); } catch {}
  };

  const openSix = () => {
    playSixWarning();
    setMenu(false);
    setHuntPanel(false);
    setSix(true);
    setStep(0);
    setMsg('');
    setHuntPanel(false);
    setQ(sixQuestions[Math.floor(Math.random() * sixQuestions.length)]);
  };

  const answer = (value) => {
    if (value !== q.a) {
      setStep(0);
      setMsg(q.wrong);
      setQ(sixQuestions[Math.floor(Math.random() * sixQuestions.length)]);
      return;
    }
    const next = step + 1;
    if (next >= 5) {
      setSix(false);
      setStep(0);
      setMsg('');
      return;
    }
    setStep(next);
    setMsg(q.right + ' • ' + next + '/5');
    const pool = sixQuestions.filter((item) => item.q !== q.q);
    setQ(pool[Math.floor(Math.random() * pool.length)]);
  };

  return (
    <div className="app-shell">
      {!six && (
        <header className="nav-shell">
          <TransitionLink href="/hq" className="brand" aria-label="LYKA home">
            <span className="brand-icon"><img src="/lyka-mark.svg" alt="" /></span>
            <span className="brand-copy"><b>LYKA</b><small>FIELD SYSTEM / 032</small></span>
          </TransitionLink>
          <nav className="main-nav" aria-label="LYKA navigation">
            {allLinks.map(([href, label], index) => (
              <TransitionLink key={href} href={href} className={path === href ? 'active' : ''}>
                <span>{label}</span>{index >= links.length && <i>NEW</i>}
              </TransitionLink>
            ))}
          </nav>
          <div className="nav-right"><TransitionLink href="/ai" className="ai-nav-button">AI ↗</TransitionLink><button className="global-search-trigger" onClick={()=>setSearchOpen(true)} title="Search LYKA">⌕ <span>SEARCH</span></button>
            <button className={'hunt-pill '+(hunt.length===10?'complete':'')} title="Secret Hunt progress · press H" onClick={()=>setHuntPanel(v=>!v)}><i/> HUNT <b>{hunt.length}/10</b></button><span className="ghee-pill"><i />GHEE <b>{ghee}%</b></span>
            <button className="index-button" onClick={() => setMenu((v) => !v)}><i /><span>{menu ? 'CLOSE' : 'INDEX'}</span></button>
          </div>
        </header>
      )}

      {searchOpen && !six && <div className="lyka-search-overlay" onClick={()=>setSearchOpen(false)}><div className="lyka-search-panel" onClick={e=>e.stopPropagation()}><div className="search-head"><span>LYKA / GLOBAL INDEX</span><button onClick={()=>setSearchOpen(false)}>×</button></div><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search rooms, systems, routes…"/><div className="search-results">{allLinks.filter(([href,label])=>(label+' '+href).toLowerCase().includes(search.toLowerCase())).map(([href,label],i)=><TransitionLink key={href} href={href} onClick={()=>setSearchOpen(false)}><b>{String(i+1).padStart(2,'0')}</b><span>{label}</span><em>{href}</em></TransitionLink>)}{!allLinks.some(([href,label])=>(label+' '+href).toLowerCase().includes(search.toLowerCase()))&&<p>NO MATCH / TRY ANOTHER SIGNAL.</p>}</div><small className="search-foot">ENTER A ROOM · ESC/CLOSE TO EXIT</small></div></div>}

      {menu && !six && (
        <div className="nav-overlay" onClick={() => setMenu(false)}>
          <div className="nav-drawer premium-nav-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <div><span>LYKA / FIELD INDEX</span><small>ALL SYSTEMS • 032</small></div>
              <button onClick={() => setMenu(false)} aria-label="Close navigation">×</button>
            </div>
            <div className="drawer-hero">
              <small>NAVIGATION</small>
              <h2>Choose<br /><i>your route.</i></h2>
              <p>The entire archive, arranged properly.</p>
            </div>
            <div className="drawer-links">
              {allLinks.map(([href, label], index) => (
                <TransitionLink key={href} href={href} onClick={() => setMenu(false)}>
                  <span>{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong><em>↗</em>
                </TransitionLink>
              ))}
            </div>
            <button className="drawer-six" onClick={openSix}>
              <span>09</span><div><strong>SIX MODE</strong><small>ENTER THE LOCKDOWN</small></div><em>↗</em>
            </button>
            <div className="drawer-foot"><span>PRIVATE ARCHIVE / 2026</span><span>ESC TO CLOSE</span></div>
          </div>
        </div>
      )}

      {false && !six && (
        <div className="command-backdrop" onClick={() => setCmd(false)}>
          <div className="command-panel" onClick={(e) => e.stopPropagation()}>
            <div className="command-head"><span>LYKA COMMAND</span><kbd>ESC</kbd></div>
            <div className="command-input"><span>SEARCH LYKA</span><kbd>/</kbd></div>
            <div className="command-grid">
              {allLinks.map(([href, label]) => (
                <TransitionLink key={href} href={href} onClick={() => setCmd(false)}><span>{label}</span><b>↗</b></TransitionLink>
              ))}
              <button onClick={openSix}><span>Six Mode</span><b>⚡</b></button>
            </div>
            <div className="command-foot"><span>LYKA NAVIGATION SYSTEM</span><b>ESC TO CLOSE</b></div>
          </div>
        </div>
      )}

      <main>{children}</main>
      {huntPanel && !six && <div className="hunt-panel"><div><span className="eyebrow">LYKA / SECRET HUNT</span><button onClick={()=>setHuntPanel(false)}>×</button></div><h3>{hunt.length}/10 <em>found.</em></h3><div className="hunt-progress"><i style={{width:(hunt.length*10)+'%'}}/><span>{hunt.length*10}%</span></div><p>{hunt.length===10?'Every secret has been found. The ₹100 reward is unlocked.':'Ten tiny locations are hidden across the archive. Clues are casual on purpose — if you want the exact spot, you gotta look. Press H anytime to reopen this panel.'}</p><div className="hunt-hints">{[['LYKA','first screen pe ek chhoti si cheez ko ignore mat kar 👀'],['ROAST','screen ke kone pe thoda sus kuch hai'],['MATHS','yahan ek number bas number nahi hai bhai'],['ORBIT','route ko bhi dekh, sirf buttons ko nahi'],['VAULT','jo corner bilkul boring lag raha hai, wahi dekh'],['LMAO','games khatam nahi hote jab game khatam hota hai 💀'],['PHOTOS','photo dekh li? ab thoda idhar-udhar bhi scan kar'],['ABOUT','system kuch yaad rakhta hai... bas kya, woh dekh'],['ARCHIVE','files padh aur beech ki bakchodi notice kar'],['HQ','subject file mein ek thread loose chhoda hai']].map(([name,clue],i)=><div key={name} className={hunt.includes(i)?'found':''}><b>{String(i+1).padStart(2,'0')}</b><span>{hunt.includes(i)?'✓ FOUND':name+' — '+clue}</span></div>)}</div></div>}
      {(() => {
        const secretSpots = [
          {route:'/hq',index:0,left:'12%',top:'29%',kind:'easy'},
          {route:'/roast',index:1,left:'88%',top:'24%',kind:'easy'},
          {route:'/maths-sir',index:2,left:'18%',top:'72%',kind:'easy'},
          {route:'/mission',index:3,left:'83%',top:'64%',kind:'easy'},
          {route:'/memes',index:4,left:'9%',top:'52%',kind:'easy'},
          {route:'/lmao',index:5,left:'91%',top:'78%',kind:'easy'},
          {route:'/photos',index:6,left:'72%',top:'34%',kind:'easy'},
          {route:'/about',index:7,left:'27%',top:'83%',kind:'easy'},
          {route:'/archive',index:8,left:'96%',top:'91%',kind:'hard'},
          {route:'/hq',index:9,left:'50.5%',top:'11%',kind:'genius'}
        ];
        const spot=secretSpots.find(x=>x.route===path && !hunt.includes(x.index));
        return spot ? <button className={'hunt-hotspot '+spot.kind} style={{left:spot.left,top:spot.top}} onClick={()=>revealSecret(spot.index)} aria-label={'Hidden field artifact '+(spot.index+1)}><span className="hunt-artifact-core"/><i className="hunt-artifact-ring"/><b>FIELD ARTIFACT {String(spot.index+1).padStart(2,'0')}</b></button> : null;
      })()}
      {huntCelebration && <div className={'hunt-celebration '+(huntCelebration.final?'final':'')} aria-live="polite">
        <div className="celebration-burst">{Array.from({length:42},(_,i)=><i key={i} style={{'--a':(i*8.57)+'deg','--d':(70+(i%9)*12)+'px','--r':(i%2?'2px':'4px'),'--delay':(i%7)*18+'ms'}}/> )}</div>
        <div className="celebration-card"><span>✦ SECRET {String(huntCelebration.index+1).padStart(2,'0')} FOUND ✦</span><b>{huntCelebration.final?'HUNT COMPLETE':'NICE FIND.'}</b><small>{huntCelebration.final?'10/10 — challenge unlocked.':'Keep going. The difficulty just changed.'}</small></div>
      </div>}
      {huntToast && <div className="hunt-toast">{huntToast}</div>}{endgame&&!six&&<div className="hunt-endgame"><div className="endgame-card"><span>LYKA / FINAL FIELD FILE</span><b>10 / 10</b><h2>YOU FOUND<br/><em>THE WHOLE THING.</em></h2><p>The archive is complete. The challenge reward is unlocked inside the site.</p><div><button className="button hot" onClick={()=>setEndgame(false)}>ENTER THE ARCHIVE ↗</button><button onClick={()=>setEndgame(false)}>CLOSE</button></div></div></div>}
      {updateOpen && !six && <div className="update-overlay"><div className="update-card"><div className="update-signal"><i/>SYSTEM UPDATE <b>● LIVE</b></div><div className="notification-meta"><span>LYKA / FIELD SYSTEM</span><span>22 SEP 2026 · 032</span></div><h2>New features.<br/><em>Hidden in plain sight.</em></h2><p><b>10 hidden secrets</b> are now scattered across LYKA. Explore the rooms, inspect the interface and complete the hunt to unlock the in-site <b>₹100 challenge reward</b>.</p><div className="update-grid"><span>01 / Explore normally first.</span><span>02 / Inspect unusually polished details.</span><span>03 / Hints are available if you get stuck.</span><span>04 / Progress saves in this browser.</span><span>05 / Secret 09 is harder.</span><span>06 / Secret 10 is the final challenge.</span><button className="button hot" onClick={closeUpdate}>CONTINUE TO LYKA ↗</button></div><button className="update-hint" onClick={()=>setHint(v=>!v)}>{hint?'Hint: inspect the interface, not just the content.':'NEED A STARTING HINT?'}</button>{hint&&<small className="update-hint-text">Hint: obvious buttons ko chhod. Jahan UI thoda unnecessarily perfect lag raha hai, wahan dekh.</small>}</div></div>}
      <GlobalFX />
      <Danger />

      {six && (
        <div className="six-root" onContextMenu={(e) => e.preventDefault()}>
          <div className="six-rain">
            {Array.from({ length: 46 }, (_, index) => (
              <span key={index} style={{
                left: (index * 19) % 100 + '%',
                animationDelay: '-' + (index % 13) * 0.33 + 's',
                animationDuration: 3.2 + (index % 6) * 0.5 + 's'
              }}>
                {index % 2 ? 'SIX / BREACH' : 'MEETHE LOG AA GAYE'}
              </span>
            ))}
          </div>
          <div className="six-panel">
            <div className="six-top"><span>SIX / LOCKDOWN</span><b>{step}/5</b></div>
            <div className="six-badge">6</div>
            <h1>MEETHE LOG<br /><i>AA GAYE.</i></h1>
            <p>Normal navigation band. Five sahi jawab chahiye. Galat hua toh streak <b>0</b>.</p>
            <div className="six-question">
              <small>SECURITY CHECK</small>
              <h2>{q.q}</h2>
              <div className="six-options">
                {q.opts.map((option) => <button key={option} onClick={() => answer(option)}>{option}</button>)}
              </div>
              {msg && <div className="six-msg">{msg}</div>}
            </div>
            <div className="six-foot">Navigation sealed • Broken by Anik's family™</div>
          </div>
        </div>
      )}
    </div>
  );
}
