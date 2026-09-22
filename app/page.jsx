'use client';
import{useEffect,useMemo,useState}from'react';
import{TransitionLink}from'../components/TransitionLink';
import{Reveal}from'../components/Reveal';
import{jokes,hardMaths}from'../lib/data';
import{useSite}from'../components/SiteProvider';

const modules=[
  {no:'01',tag:'CHAOS LAB',title:'ROAST ENGINE',text:'A live confidence check. Press it. Regret it.',href:'/roast',tone:'lime'},
  {no:'02',tag:'ACADEMIC DEPT.',title:'MATHS SIR',text:'Hard questions, timer pressure, zero mercy.',href:'/maths-sir',tone:'blue'},
  {no:'03',tag:'MISSION CTRL',title:'LYKA-01',text:'Move the satellite. Break nothing. Probably.',href:'/mission',tone:'orange'},
];

export default function Home(){
 const{ghee,cool}=useSite();
 const[joke,setJoke]=useState(jokes[0]);
 const[flash,setFlash]=useState('SYSTEM NOMINAL');
 const[energy,setEnergy]=useState(72);
 useEffect(()=>{const id=setInterval(()=>{setJoke(jokes[Math.floor(Math.random()*jokes.length)]);setFlash(['SYSTEM NOMINAL','ANIK DETECTED','GHEE RESERVE STABLE','COOL LEVEL RISING'][Math.floor(Math.random()*4)]);setEnergy(58+Math.floor(Math.random()*39))},3200);return()=>clearInterval(id)},[]);
 const challenge=useMemo(()=>hardMaths[Math.floor(Math.random()*hardMaths.length)],[]);
 return <div className="page home-v2">
  <section className="hero-v2">
   <div className="hero-v2-copy">
    <div className="status-line"><span>LYKA / FIELD SYSTEM 032</span><i></i><b>{flash}</b></div>
    <h1>WELCOME<br/><em>TO THE</em><br/>ANIKVERSE<span>.</span></h1>
    <p className="hero-v2-lede">A deliberately over-engineered digital archive for Anik — part field report, part game, part maths lab, part complete nonsense.</p>
    <div className="hero-v2-actions">
      <TransitionLink href="/hq" className="button primary-v2">ENTER THE SYSTEM <span>↗</span></TransitionLink>
      <TransitionLink href="/memes" className="button ghost-v2">OPEN THE VAULT</TransitionLink>
    </div>
    <div className="hero-micro"><span>SCROLL TO EXPLORE</span><div></div><span>NO LOGIN / NO SERIOUSNESS</span></div>
   </div>
   <div className="hero-v2-visual">
    <div className="image-index">ARCHIVE / 001 <span>LIVE</span></div>
    <div className="portrait-wrap"><img src="/photos/anik-01.jpeg" alt="Anik"/><div className="portrait-grid"></div><div className="portrait-label"><b>ANIK</b><span>SUBJECT 001</span></div></div>
    <div className="orbit-dot"></div>
    <div className="hero-side-note">FIELD<br/>PHOTO<br/><strong>001</strong></div>
   </div>
  </section>

  <section className="ticker-v2"><div>{joke} <span>///</span> {joke} <span>///</span> {joke} <span>///</span></div></section>

  <section className="manifesto">
    <div className="section-kicker"><span>00 / THE BRIEF</span><b>SCROLL DOWN ↓</b></div>
    <div className="manifesto-grid"><h2>NOT A<br/><em>WEBSITE.</em></h2><p>This is what happens when a normal friend archive gets too much caffeine. Every page has a job. Some jobs are useful. Some are absolutely not. The point is to explore.</p></div>
  </section>

  <section className="module-section">
   <div className="section-kicker"><span>01 / SYSTEM MODULES</span><b>SELECT A DEPARTMENT</b></div>
   <div className="module-grid">{modules.map((m,i)=><TransitionLink key={m.href} href={m.href} className={'module-card '+m.tone}>
     <div className="module-top"><span>{m.no}</span><small>{m.tag}</small><b>↗</b></div>
     <div><h3>{m.title}</h3><p>{m.text}</p></div>
     <div className="module-bottom"><span>OPEN MODULE</span><i></i></div>
   </TransitionLink>)}</div>
  </section>

  <section className="dashboard-v2">
   <div className="dash-main">
    <div className="section-kicker"><span>02 / LIVE TELEMETRY</span><b>LOCAL SESSION</b></div>
    <div className="telemetry-big"><strong>{energy}</strong><span>%</span></div>
    <p>Current Anik energy reading. Completely scientific. Absolutely unverified.</p>
    <div className="energy-bar"><i style={{width:energy+'%'}}></i></div>
    <div className="telemetry-stats"><div><small>GHEE</small><b>{ghee}%</b></div><div><small>COOL POINTS</small><b>{cool}</b></div><div><small>STATE</small><b>ONLINE</b></div></div>
   </div>
   <div className="dash-side">
    <div className="mini-head"><span>DAILY CHALLENGE</span><b>HARD LAB</b></div>
    <h3>{challenge.q}</h3>
    <p>Can you solve it before entering the Maths Lab?</p>
    <TransitionLink href="/maths-sir" className="text-link">TAKE THE CHALLENGE →</TransitionLink>
   </div>
  </section>

  <section className="quote-v2"><span>03 / FIELD NOTE</span><h2>“It doesn’t have to make sense.<br/><em>It just has to be fun.</em>”</h2><small>— LYKA OPERATIONS / 2026</small></section>
 </div>
}