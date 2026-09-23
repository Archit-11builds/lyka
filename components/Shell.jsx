'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSite } from './SiteProvider';
import { TransitionLink } from './TransitionLink';
import { GlobalFX } from './GlobalFX';
import { Danger } from './Danger';
import { sixQuestions } from '../lib/data';
import { AnikAIWidget } from './AnikAIWidget';

const links = [
  ['/hq', 'HQ'], ['/roast', 'Roast'], ['/maths-sir', 'Maths'], ['/mission', 'Orbit'],
];
const allLinks = [...links, ['/ai', 'LYKA AI'], ['/chaos', 'Chaos'], ['/iq', 'Anik IQ'], ['/live', 'Live Feed'], ['/incidents', 'Incident Room'], ['/lmao', 'LMAO Lab'], ['/photos', 'Photos'], ['/about', 'About']];

export function Shell({ children }) {
  const path = usePathname();
  const router = useRouter();
  const { ghee, cool, six, setSix, refill } = useSite();
  const [menu, setMenu] = useState(false);
  const [gheeOpen, setGheeOpen] = useState(false);
  const [gheeCatches, setGheeCatches] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [command, setCommand] = useState('');
    const [step, setStep] = useState(0);
  const [q, setQ] = useState(() => sixQuestions[Math.floor(Math.random() * sixQuestions.length)]);
  const [msg, setMsg] = useState('');
  const [sixWarning, setSixWarning] = useState(false);
  const sixAudioRef = useRef(null);
  const [hunt, setHunt] = useState([]);
  const [brandTaps, setBrandTaps] = useState(0);
  const [hint, setHint] = useState(false);
  const [huntPanel, setHuntPanel] = useState(false);
  const [huntToast, setHuntToast] = useState('');
  const [huntCelebration, setHuntCelebration] = useState(null); const [searchOpen,setSearchOpen]=useState(false); const [search,setSearch]=useState(''); const [endgame,setEndgame]=useState(false); const [welcomeOpen,setWelcomeOpen]=useState(true); const [welcomeLeaving,setWelcomeLeaving]=useState(false);

  useEffect(() => {
    try { setHunt(JSON.parse(localStorage.getItem('lyka-hunt') || '[]')); } catch {}
    document.body.classList.toggle('locked', six);
    if (!six) return () => document.body.classList.remove('locked');
    return () => document.body.classList.remove('locked');
  }, [six]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > Math.max(420, document.documentElement.scrollHeight * 0.58)) revealSecret(1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hunt]);
  useEffect(() => {
    const routeSignals = {'/maths-sir':3,'/mission':4,'/photos':8};
    const signal = routeSignals[path];
    if (signal === undefined || hunt.includes(signal)) return;
    const timer = window.setTimeout(() => revealSecret(signal), path === '/mission' ? 1800 : 1200);
    return () => window.clearTimeout(timer);
  }, [path, hunt]);

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
    const names = ['BRAND SIGNAL','DEEP SCROLL','GHEE RESERVE','MATHS VECTOR','ORBIT CHECK','SEARCH TRACE','COMMAND TRACE','AI SIGNAL','INDEX TRACE','FIELD PHRASE'];
    setHuntToast(next.length === 10 ? 'ALL 10 FIELD TASKS COMPLETE — CHALLENGE UNLOCKED' : names[index] + ' COMPLETE — ' + remaining + ' REMAINING');
    setHuntCelebration({ index, final: next.length === 10 });
    window.setTimeout(() => setHuntToast(''), 2600);
    window.setTimeout(() => setHuntCelebration(null), 2100);
    window.dispatchEvent(new CustomEvent('lyka:secret', { detail: { index, remaining } }));
  };

  useEffect(()=>{ if(hunt.length===10){setEndgame(true)} },[hunt.length]);

  useEffect(() => {
    let sequence = '';
    const onKey = e => {
      if (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) { e.preventDefault(); setCommandOpen(true); }
      if (e.key === 'Escape') setCommandOpen(false);
      if (!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)) {
        sequence = (sequence + e.key.toLowerCase()).slice(-4);
        if (sequence === 'cool') revealSecret(9);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hunt]);
  const runCommand = value => { if(value.trim().toLowerCase()==='field-032'){revealSecret(6);setCommandOpen(false);setCommand('');return;} const map={hq:'/hq',roast:'/roast',maths:'/maths-sir',orbit:'/mission',vault:'/memes',archive:'/archive',lmao:'/lmao',live:'/live',incidents:'/incidents',photos:'/photos',about:'/about',ai:'/ai'}; const key=value.trim().toLowerCase().replace(/^\//,''); if(map[key]){setCommandOpen(false);router.push(map[key])} };
  const enterLyka = () => { setWelcomeLeaving(true); window.setTimeout(() => setWelcomeOpen(false), 760); };

  const startSixAudio = () => {
    try {
      if (sixAudioRef.current) sixAudioRef.current.pause?.();
      const audio = new Audio('/six-warning.mp3');
      audio.loop = true;
      audio.volume = 1.0;
      audio.preload = 'auto';
      const play = audio.play();
      if (play?.catch) play.catch(err => console.warn('SIX audio could not autoplay:', err));
      sixAudioRef.current = audio;
    } catch (error) {
      console.warn('SIX audio setup failed:', error);
    }
  };
  const stopSixAudio = () => {
    try {
      const audio = sixAudioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
      }
    } catch {}
    sixAudioRef.current = null;
  };
  const openSix = () => {
    setMenu(false);
    setHuntPanel(false);
    setSixWarning(true);
  };
  const confirmSix = () => {
    setSixWarning(false);
    setSix(true);
    setStep(0);
    setMsg('');
    setQ(sixQuestions[Math.floor(Math.random() * sixQuestions.length)]);
    window.setTimeout(startSixAudio, 40);
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
      stopSixAudio();
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
        <header className="nav-shell premium-topbar">
          <TransitionLink href="/hq" className="brand" aria-label="LYKA home">
            <span className="brand-icon"><img src="/lyka-mark.svg" alt="" /></span>
            <span className="brand-copy"><b>LYKA</b><small>FIELD SYSTEM / 032</small></span>
          </TransitionLink>
          <div className="topbar-center"><span>PRIVATE ARCHIVE</span><i></i><b>{path === '/hq' ? 'HQ' : (allLinks.find(([href])=>href===path)?.[1] || 'FIELD')}</b></div>
          <div className="nav-right">
            <button className="global-search-trigger" onClick={()=>setSearchOpen(true)} title="Search LYKA">⌕ <span>SEARCH</span></button>
            <button className={'hunt-pill '+(hunt.length===10?'complete':'')} title="Secret Hunt progress · press H" onClick={()=>setHuntPanel(v=>!v)}><i/> HUNT <b>{hunt.length}/10</b></button>
            <button className={"ghee-pill "+(gheeOpen?"open":"")} onClick={()=>setGheeOpen(v=>!v)} title="Open Ghee Catcher"><i />GHEE <b>{ghee}%</b><em>↗</em></button>
            <button className="dial-trigger" onClick={() => setMenu(v => !v)} aria-label="Open LYKA navigation" aria-expanded={menu}>
              <span className="dial-trigger-ring"><i></i><i></i><i></i></span><b>INDEX</b>
            </button>
          </div>
        </header>
      )}
      {gheeOpen && !six && <div className="ghee-catcher-popover" role="dialog" aria-label="Ghee Catcher">
        <div className="ghee-catcher-head"><span>LYKA / RESOURCE LAB</span><button onClick={()=>setGheeOpen(false)}>×</button></div>
        <div className="ghee-catcher-read"><div><small>GHEE RESERVE</small><strong>{ghee}<b>%</b></strong></div><span>+5 / CATCH</span></div>
        <div className="ghee-catcher-meter"><i style={{width:ghee+'%'}}/><span>{ghee}%</span></div>
        <button className="ghee-catch-button" onClick={()=>{if(ghee<100){refill(Math.min(100,ghee+5));setGheeCatches(v=>v+1);revealSecret(2)}}} disabled={ghee>=100}><span>🥣</span><b>{ghee>=100?'RESERVE FULL':'CATCH GHEE'}</b><em>{ghee>=100?'100%':'CATCH #'+(gheeCatches+1)}</em></button>
        <div className="ghee-catcher-stats"><span>CATCHES <b>{gheeCatches}</b></span><span>COOL <b>{cool}</b></span><span>STATUS <b>{ghee>=80?'STABLE':'LOW'}</b></span></div>
      </div>}
      {searchOpen && !six && <div className="lyka-search-overlay" onClick={()=>setSearchOpen(false)}><div className="lyka-search-panel" onClick={e=>e.stopPropagation()}><div className="search-head"><span>LYKA / GLOBAL INDEX</span><button onClick={()=>setSearchOpen(false)}>×</button></div><input autoFocus value={search} onChange={e=>{setSearch(e.target.value);if(e.target.value.trim().toLowerCase()==='lyka')revealSecret(5)}} placeholder="Search rooms, systems, routes…"/><div className="search-results">{allLinks.filter(([href,label])=>(label+' '+href).toLowerCase().includes(search.toLowerCase())).map(([href,label],i)=><TransitionLink key={href} href={href} onClick={()=>setSearchOpen(false)}><b>{String(i+1).padStart(2,'0')}</b><span>{label}</span><em>{href}</em></TransitionLink>)}{!allLinks.some(([href,label])=>(label+' '+href).toLowerCase().includes(search.toLowerCase()))&&<p>NO MATCH / TRY ANOTHER SIGNAL.</p>}</div><small className="search-foot">ENTER A ROOM · ESC/CLOSE TO EXIT</small></div></div>}

      {menu && !six && (
        <div className="dial-overlay" onClick={() => setMenu(false)}>
          <div className="dial-stage" onClick={e=>e.stopPropagation()}>
            <div className="dial-topline"><span>LYKA / NAVIGATION DIAL</span><button onClick={()=>setMenu(false)}>ESC</button></div>
            <div className="dial">
              <div className="dial-orbit dial-orbit-a"></div><div className="dial-orbit dial-orbit-b"></div>
              <div className="dial-core"><img src="/lyka-mark.svg" alt="LYKA"/><span>FIELD<br/>INDEX</span></div>
              {allLinks.map(([href,label],index)=>{
                const angle=(index/allLinks.length)*360-90;
                return <TransitionLink key={href} href={href} onClick={()=>setMenu(false)} className={'dial-item '+(path===href?'active':'')} style={{'--angle':angle+'deg'}}>
                  <span>{String(index+1).padStart(2,'0')}</span><b>{label}</b><i></i>
                </TransitionLink>
              })}
              <button className="dial-six" onClick={openSix}><span>⚡</span><b>SIX</b></button>
            </div>
            <div className="dial-footer"><span>{allLinks.length} ROOMS</span><b>{allLinks.find(([href])=>href===path)?.[1] || 'FIELD'}</b><span>SELECT A SIGNAL</span></div>
          </div>
        </div>
      )}

      {sixWarning && !six && (
        <div className="six-warning" role="dialog" aria-modal="true" aria-label="SIX MODE WARNING">
          <div className="six-warning-card">
            <span>⚠</span><h2>SIX MODE WARNING</h2>
            <button onClick={confirmSix}>ENTER SIX</button>
            <button onClick={()=>setSixWarning(false)}>CANCEL</button>
          </div>
        </div>
      )}

      <main>{children}</main>
      {huntPanel && !six && <div className="hunt-panel"><div><span className="eyebrow">LYKA / SECRET HUNT</span><button onClick={()=>setHuntPanel(false)}>×</button></div><h3>{hunt.length}/10 <em>found.</em></h3><div className="hunt-progress"><i style={{width:(hunt.length*10)+'%'}}/><span>{hunt.length*10}%</span></div><p>{hunt.length===10?'Every field task is complete. The final challenge is unlocked.':'This is no logo hunt. LYKA hides actions, signals and tiny system behaviours. Follow the clues, experiment, and the archive will remember.'}</p><div className="hunt-map">
{[
['BRAND SIGNAL','01','Warm-up','LYKA ko teen baar visit karo.'],
['DEEP SCROLL','02','Easy','Kisi room ko seriously scroll karo.'],
['GHEE RESERVE','03','Easy','Ghee Catcher se ek reserve catch karo.'],
['MATHS VECTOR','04','Medium','Maths Lab mein enter karo.'],
['ORBIT CHECK','05','Medium','Orbit ko thoda time do.'],
['SEARCH TRACE','06','Medium','Global Search mein secret word “LYKA” type karo.'],
['COMMAND TRACE','07','Hard','Command palette mein field-032 enter karo.'],
['AI SIGNAL','08','Hard','ANIK.EXE ko activate karo.'],
['INDEX TRACE','09','Hard','Photos room mein archive signal discover karo.'],
['FIELD PHRASE','10','FINAL','Final clue unlock hone ke baad field phrase follow karo.']
].map(([name,num,diff,clue],i)=><div key={name} className={'hunt-node '+(hunt.includes(i)?'found ':'')+(i===hunt.length?'next':'')}><div className="hunt-node-top"><b>{num}</b><span>{diff}</span>{hunt.includes(i)&&<i>FOUND</i>}</div><strong>{name}</strong><small>{hunt.includes(i)?'FIELD SIGNAL CAPTURED':i===hunt.length?clue:'SIGNAL LOCKED · FIND THE PREVIOUS TRACE'}</small></div>)}
</div>
<div className="hunt-next"><span>NEXT TRACE</span><b>{hunt.length<10?['BRAND SIGNAL','DEEP SCROLL','GHEE RESERVE','MATHS VECTOR','ORBIT CHECK','SEARCH TRACE','COMMAND TRACE','AI SIGNAL','INDEX TRACE','FIELD PHRASE'][hunt.length]:'ARCHIVE COMPLETE'}</b><small>{hunt.length<10?'One clue at a time. The archive will remember every find.':'All ten traces captured. Final field file unlocked.'}</small></div></div>}
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
        const spot=null;
        return null;
      })()}
      {huntCelebration && <div className={'hunt-celebration '+(huntCelebration.final?'final':'')} aria-live="polite">
        <div className="celebration-burst">{Array.from({length:42},(_,i)=><i key={i} style={{'--a':(i*8.57)+'deg','--d':(70+(i%9)*12)+'px','--r':(i%2?'2px':'4px'),'--delay':(i%7)*18+'ms'}}/> )}</div>
        <div className="celebration-card"><span>✦ SECRET {String(huntCelebration.index+1).padStart(2,'0')} FOUND ✦</span><b>{huntCelebration.final?'HUNT COMPLETE':'NICE FIND.'}</b><small>{huntCelebration.final?'10/10 — challenge unlocked.':'Keep going. The difficulty just changed.'}</small></div>
      </div>}
      {huntToast && <div className="hunt-toast">{huntToast}</div>}{endgame&&!six&&<div className="hunt-endgame"><div className="endgame-card"><span>LYKA / FINAL FIELD FILE</span><b>10 / 10</b><h2>YOU FOUND<br/><em>THE WHOLE THING.</em></h2><p>The archive is complete. The challenge reward is unlocked inside the site.</p><div><button className="button hot" onClick={()=>setEndgame(false)}>ENTER THE ARCHIVE ↗</button><button onClick={()=>setEndgame(false)}>CLOSE</button></div></div></div>}
      {welcomeOpen && !six && (
        <div className={'welcome-overlay '+(welcomeLeaving?'leaving':'')} aria-label="LYKA welcome">
          <div className="welcome-card">
            <div className="welcome-topline"><span>ANIK / PRIVATE ARCHIVE</span><b>FIELD 032</b></div>
            <div className="welcome-ambient" aria-hidden="true"><i/><i/><i/></div>
            <div className="welcome-layout">
              <div className="welcome-copy">
                <span className="welcome-kicker">LYKA — ANIK FIELD SYSTEM</span>
                <h1>Ready to enter<br/><em>the cool side?</em></h1>
                <p className="welcome-hindi">Kya aap Anik ki cool duniya mein jaane ke liye ready hain?</p>
                <p className="welcome-sub">A private archive of rooms, evidence, chaos and things that probably did not need to be documented.</p>
                <button className="welcome-enter" onClick={enterLyka}><span>ENTER THE ARCHIVE</span><b>↗</b></button>
              </div>
              <div className="welcome-hero-mark"><div className="welcome-ring r1"/><div className="welcome-ring r2"/><div className="welcome-mark"><img src="/lyka-mark.svg" alt="LYKA" /></div><span>032 / LIVE</span></div>
            </div>
            <div className="welcome-meta"><span>PRIVATE / 2026</span><span>NO ACCOUNT REQUIRED</span><span>FIELD SYSTEM ONLINE</span></div>
          </div>
        </div>
      )}
      {commandOpen && !six && <div className="command-overlay" onClick={()=>setCommandOpen(false)}><div className="command-box" onClick={e=>e.stopPropagation()}><div className="command-top"><span>LYKA / COMMAND PALETTE</span><kbd>ESC</kbd></div><input autoFocus value={command} onChange={e=>{setCommand(e.target.value);runCommand(e.target.value)}} onKeyDown={e=>{if(e.key==='Enter')runCommand(command)}} placeholder="Jump to a room…  /" /><small>HQ · Roast · Maths · Orbit · Archive · AI · Live · Photos</small></div></div>}
      {!six && <div onClick={()=>revealSecret(7)}><AnikAIWidget route={path} ghee={ghee} cool={cool} /></div>}
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
            <div className="six-top"><span>LYKA / SIX PROTOCOL</span><b>STREAK {step}/5</b></div>
            <div className="six-status"><i/> LOCKDOWN ACTIVE <em>◉ AUDIO LOOP</em></div>
            <div className="six-badge">VI</div>
            <div className="six-kicker">FIELD 032 / FINAL GATE</div>
            <h1>SIX<br /><i>PROTOCOL.</i></h1>
            <p className="six-sub">Five consecutive correct answers. One mistake resets the sequence.</p>
            <div className="six-streak" aria-label={"Streak " + step + " of 5"}>
              {[0,1,2,3,4].map(i=><span key={i} className={i<step?'lit':''}>{String(i+1).padStart(2,'0')}</span>)}
            </div>
            <div className="six-question">
              <div className="six-q-head"><small>SECURITY QUESTION {step+1}/5</small><b>NO SKIP</b></div>
              <h2>{q.q}</h2>
              <div className="six-options">
                {q.opts.map((option) => <button key={option} onClick={() => answer(option)}>{option}<span>↗</span></button>)}
              </div>
              {msg && <div className="six-msg">{msg}</div>}
            </div>
            <div className="six-foot"><span>ROUTE SEALED</span><span>ANSWER IN SEQUENCE</span><span>AUDIO ACTIVE</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
