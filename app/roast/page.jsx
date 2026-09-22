'use client';

import { useEffect, useState } from 'react';
import { useSite } from '../../components/SiteProvider';
import { jokes } from '../../lib/data';
import { Reveal } from '../../components/Reveal';

export default function Roast() {
  const { cool, coolUp, ghee } = useSite();
  const [line, setLine] = useState(jokes[0]);
  const [heat, setHeat] = useState(18);
  const [secret, setSecret] = useState(false);
  const [combo, setCombo] = useState(0);
  const [flash, setFlash] = useState(false);

  const fire = () => {
    coolUp();
    setCombo(v => v + 1);
    setHeat(v => Math.min(100, v + 9));
    setLine(jokes[Math.floor(Math.random() * jokes.length)]);
    setFlash(true);
    setTimeout(() => setFlash(false), 260);
  };

  return (
    <div className="page roast-page">
      <div className="page-title roast-title">
        <div><span className="eyebrow">ROOM 01 / ROAST LAB / LIVE</span><h1>Ban Gaya <em>Cool.</em></h1><p className="lede">A deliberately unnecessary machine for measuring confidence, chaos and absolutely nothing useful.</p></div>
        <div className="roast-status"><i/> LIVE / ONLINE<br/><b>{cool.toString().padStart(2,'0')}</b><small>COOL EVENTS</small></div>
      </div>

      <Reveal className="roast-console">
        <section className={'roast-console-main ' + (flash ? 'flash' : '')}>
          <div className="roast-console-top"><span>CONFIDENCE ENGINE / 01</span><b>PRESS THE BUTTON. REGRET NOTHING.</b></div>
          <div className="roast-visual">
            <div className="roast-rings"><i/><i/><i/><span>LYKA<br/>COOL<br/>CORE</span></div>
            <div className="roast-readout"><small>COOL LEVEL</small><strong>{cool}</strong><em>events</em></div>
            <button className="cool-core" onClick={fire}><span>⚡</span><b>BAN GAYA<br/>COOL</b><small>CLICK TO DEPLOY</small></button>
            <div className="roast-axis x"/><div className="roast-axis y"/>
          </div>
          <div className="roast-bottom">
            <div><small>LIVE TRANSMISSION</small><p>“{line}”</p></div>
            <div className="combo-box"><small>COMBO</small><b>x{combo}</b></div>
          </div>
        </section>

        <aside className="roast-metrics">
          <div className="metric"><span>REALITY</span><strong>{Math.max(2,100-Math.min(98,cool*7))}%</strong><i><b style={{width:Math.max(2,100-Math.min(98,cool*7))+'%'}}/></i></div>
          <div className="metric"><span>CHAOS</span><strong>{heat}%</strong><i><b style={{width:heat+'%'}}/></i></div>
          <div className="metric"><span>GHEE COST</span><strong>{ghee}%</strong><i><b style={{width:ghee+'%'}}/></i></div>
          <div className="roast-note"><small>LAB NOTE / {cool >= 6 ? 'LEVEL 02 UNLOCKED' : 'LEVEL 01'}</small><p>{cool >= 6 ? 'Delusion engine is warming up.' : 'Six clicks unlock something suspicious.'}</p>{cool >= 6 && <button onClick={()=>setSecret(v=>!v)}>{secret ? 'CLOSE' : 'OPEN LEVEL 02'} ↗</button>}</div>
        </aside>
      </Reveal>

      {secret && <div className="roast-secret premium-secret"><span>LEVEL 02 / DELUSION ENGINE</span><h2>CONFIDENCE DETECTED.</h2><p>Scientific conclusion: completely unnecessary. Keep the machine running.</p></div>}
    </div>
  );
}