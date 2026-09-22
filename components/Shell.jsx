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
const allLinks = [...links, ['/lmao', 'LMAO Lab'], ['/photos', 'Photos'], ['/about', 'About']];

export function Shell({ children }) {
  const path = usePathname();
  const { ghee, six, setSix } = useSite();
  const [menu, setMenu] = useState(false);
  const [cmd, setCmd] = useState(false);
  const [step, setStep] = useState(0);
  const [q, setQ] = useState(() => sixQuestions[Math.floor(Math.random() * sixQuestions.length)]);
  const [msg, setMsg] = useState('');
  const [hunt, setHunt] = useState([]);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('locked', six);
    return () => document.body.classList.remove('locked');
  }, [six]);

  useEffect(() => {
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmd((v) => !v);
      }
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setCmd(true);
      }
      if (e.key === 'Escape') {
        setCmd(false);
        setMenu(false);
      }
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, []);

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
    if (hunt.includes(index)) return;
    const next = [...hunt, index];
    setHunt(next);
    try { localStorage.setItem('lyka-hunt', JSON.stringify(next)); } catch {}
    window.dispatchEvent(new CustomEvent('lyka:secret', { detail: { index, remaining: 10 - next.length } }));
  };

  const closeUpdate = () => {
    setUpdateOpen(false);
    try { localStorage.setItem('lyka-update-seen', '1'); } catch {}
  };

  const openSix = () => {
    playSixWarning();
    setMenu(false);
    setCmd(false);
    setSix(true);
    setStep(0);
    setMsg('');
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
          <TransitionLink href="/hq" className="brand">
            <span className="brand-icon"><img src="/lyka-mark.svg" alt="LYKA" /></span>
            <span className="brand-copy"><b>LYKA</b><small>FIELD SYSTEM / 032</small></span>
          </TransitionLink>
          <nav>
            {links.map(([href, label]) => (
              <TransitionLink key={href} href={href} className={path === href ? 'active' : ''}>{label}</TransitionLink>
            ))}
          </nav>
          <div className="nav-right">
            <span className="hunt-pill" title="Secret Hunt progress">HUNT <b>{hunt.length}/10</b></span><span className="ghee-pill"><i />GHEE <b>{ghee}%</b></span>
            <button className="command-button" onClick={() => setCmd(true)}><kbd>⌘</kbd><span>COMMAND</span><b>K</b></button>
            <button className="index-button" onClick={() => setMenu((v) => !v)}><i /><span>{menu ? 'CLOSE' : 'INDEX'}</span></button>
          </div>
        </header>
      )}

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

      {cmd && !six && (
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
      <div className="hunt-hotspot" onClick={() => revealSecret(([...links,...allLinks].findIndex(x => x[0] === path) + 10) % 10)} aria-label="Secret location"><span>·</span></div>
      {updateOpen && !six && <div className="update-overlay"><div className="update-card"><span className="eyebrow">IMPORTANT UPDATE / LYKA 032</span><h2>The hunt<br/><em>is live.</em></h2><p>There are <b>10 hidden secret locations</b> across the site. Find them all and you can claim the <b>₹100 Archit reward</b>.</p><div className="update-grid"><span>01 / Explore every room.</span><span>02 / Look for tiny suspicious details.</span><span>03 / Use the hunt hints when stuck.</span><span>04 / Progress is saved on this browser.</span><span>05 / The final secret is deliberately difficult.</span><span>06 / 10/10 = reward unlocked.</span></div><button className="button hot" onClick={closeUpdate}>UNDERSTOOD — START HUNTING ↗</button><button className="update-hint" onClick={()=>setHint(v=>!v)}>{hint?'Hint: inspect the interface, not just the content.':'NEED A STARTING HINT?'}</button>{hint&&<small className="update-hint-text">The smallest things on LYKA are sometimes the loudest.</small>}</div></div>}
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
