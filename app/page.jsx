'use client';
import{useEffect,useState}from'react';
import{TransitionLink}from'../components/TransitionLink';
import{jokes,hardMaths}from'../lib/data';
import{useSite}from'../components/SiteProvider';

const cards=[
 {n:'01',k:'CHAOS / 01',t:'ROAST ENGINE',d:'A ridiculous little confidence test.',h:'/roast',c:'violet'},
 {n:'02',k:'STUDY / 02',t:'MATHS LAB',d:'Timed problems. Hard mode. No excuses.',h:'/maths-sir',c:'coral'},
 {n:'03',k:'PLAY / 03',t:'ORBIT',d:'A tiny interactive mission hidden inside LYKA.',h:'/mission',c:'sky'},
 {n:'04',k:'ARCHIVE / 04',t:'THE VAULT',d:'Photos, memes and classified material.',h:'/archive',c:'mint'}
];

export default function Home(){
 const{ghee,cool}=useSite();const[energy,setEnergy]=useState(84);const[quote,setQuote]=useState(jokes[0]);
 useEffect(()=>{const id=setInterval(()=>{setEnergy(72+Math.floor(Math.random()*25));setQuote(jokes[Math.floor(Math.random()*jokes.length)])},3500);return()=>clearInterval(id)},[]);
 const challenge=hardMaths[2];
 return <div className="lux-home premium-home"><div className="ambient ambient-a"/><div className="ambient ambient-b"/><div className="grid-glow"/><div className="grain"/>
  <section className="lux-hero">
   <div className="hero-top"><span>LYKA / 032</span><span>ANIK FIELD ARCHIVE</span><span>EST. 2026</span></div>
   <div className="hero-orbit"><span>LYKA</span><i/><b>032</b></div><div className="hero-copy"><p className="kicker">THE UNNECESSARILY PREMIUM ARCHIVE</p><div className="home-secret-badge"><span>CLASSIFIED CHALLENGE</span><b>10 SECRETS · ₹100 REWARD</b></div><h1>ANIK<span>↗</span><br/><i>UNFILTERED.</i></h1><p className="hero-desc">A digital playground built around one person, too many inside jokes, questionable science and an unreasonable amount of attention to detail.</p><div className="hero-actions"><TransitionLink href="/hq" className="lux-btn fill">ENTER LYKA <b>↗</b></TransitionLink><TransitionLink href="/photos" className="lux-btn">VIEW ARCHIVE <b>01</b></TransitionLink></div></div>
   <div className="hero-art"><div className="hero-signal"><span>LIVE SIGNAL</span><b>032.84</b><i/></div><div className="hero-crosshair"><i/><i/></div><div className="art-card"><img src="/photos/anik-01.jpeg" alt="Anik"/><div className="art-shade"></div><div className="art-meta"><span>PORTRAIT / 001</span><b>ANIK</b></div></div><div className="art-ring r1"/><div className="art-ring r2"/><div className="art-float">LIVE<br/><strong>84</strong><small>ENERGY</small></div><div className="art-caption">NO SERIOUS BUSINESS<br/>BEYOND THIS POINT</div></div>
   <div className="scroll-mark"><span>SCROLL</span><i></i></div>
  </section>

  <section className="lux-marquee"><div>{quote} <b>✦</b> {quote} <b>✦</b> {quote} <b>✦</b></div></section>

  <section className="landing-command reveal-block"><div><span className="lux-label">00 / FIELD BRIEFING</span><h2>One archive.<br/><em>Ten things to find.</em></h2></div><div className="landing-command-copy"><p>LYKA is not meant to be clicked through once. Explore the rooms, inspect strange corners and hunt the hidden secrets.</p><a href="/lmao" className="lux-btn fill">START THE HUNT <b>↗</b></a></div></section><section className="intro-block reveal-block"><div className="lux-label">01 / ABOUT THE THING</div><div><h2>It looks serious.<br/><em>It absolutely isn't.</em></h2><p>LYKA is a private little universe: part archive, part game room, part study lab. The surface is polished. The contents are not always.</p></div></section>

  <section className="feature-section reveal-block"><div className="lux-label">02 / EXPLORE LYKA <span>04 MODULES</span></div><div className="feature-grid">{cards.map(x=><TransitionLink key={x.h} href={x.h} className={'feature-card '+x.c}><div className="feature-num">{x.n}</div><div className="card-graphic"><i/><i/><i/></div><div className="feature-body"><small>{x.k}</small><h3>{x.t}</h3><p>{x.d}</p></div><div className="feature-arrow">↗</div></TransitionLink>)}</div></section>

  <div className="orbit-lines" aria-hidden="true"><i/><i/><i/></div><section className="split-feature"><div className="study-panel"><div className="lux-label">03 / DAILY DROP <span>HARD LAB</span></div><div className="challenge-number">0{challenge.right?3:1}</div><h2>{challenge.q}</h2><p>A random hard question from the LYKA Maths Lab. The answer is waiting inside.</p><TransitionLink href="/maths-sir" className="under-link">OPEN MATHS LAB <b>→</b></TransitionLink></div><div className="stats-panel"><div className="lux-label">LIVE / SESSION</div><div className="energy-read"><strong>{energy}</strong><span>%</span></div><div className="lux-bar"><i style={{width:energy+'%'}}/></div><div className="stat-row"><div><small>GHEE</small><b>{ghee}%</b></div><div><small>COOL</small><b>{cool}</b></div><div><small>STATUS</small><b>ACTIVE</b></div></div></div></section>

  <section className="field-notes reveal-block">
   <div className="lux-label"><span>04 / FIELD NOTES</span><span>PRIVATE ARCHIVE • 2026</span></div>
   <div className="notes-layout">
    <div className="notes-intro"><p className="notes-index">LYKA / NOTEBOOK</p><h2>Small moments.<br/><em>Big archive.</em></h2><p>Not everything needs a purpose. Some things just deserve a place to live.</p></div>
    <div className="notes-list">
     <article><span>01</span><div><small>OBSERVATION</small><h3>Too much confidence.</h3><p>Documented. Repeated. Still unexplained.</p></div><b>↗</b></article>
     <article><span>02</span><div><small>STUDY LOG</small><h3>Maths was involved.</h3><p>The evidence remains suspiciously detailed.</p></div><b>↗</b></article>
     <article><span>03</span><div><small>ARCHIVE NOTE</small><h3>Nothing here is normal.</h3><p>That is, unfortunately, the point.</p></div><b>↗</b></article>
    </div>
   </div>
  </section>

  <section className="manifesto-section reveal-block">
   <div className="lux-label"><span>05 / THE MANIFESTO</span><span>NO EXPLANATION REQUIRED</span></div>
   <div className="manifesto-layout">
    <div><p className="section-index">LYKA / PRINCIPLE 01</p><h2>Make it<br/><em>unnecessarily good.</em></h2></div>
    <div className="manifesto-copy"><p>There is no practical reason for this much detail. That is precisely why it exists.</p><span>— LYKA FIELD OFFICE</span></div>
   </div>
  </section>

  <section className="signal-section reveal-block">
   <div className="lux-label"><span>06 / LIVE SIGNAL</span><span>FIELD TELEMETRY</span></div>
   <div className="signal-layout">
    <div className="signal-main"><small>ANIK / CURRENT STATE</small><strong>84<span>%</span></strong><div className="signal-wave"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
    <div className="signal-side"><article><span>01</span><b>ENERGY</b><em>UNSTABLE</em></article><article><span>02</span><b>CHAOS</b><em>OPTIMAL</em></article><article><span>03</span><b>ARCHIVE</b><em>EXPANDING</em></article></div>
   </div>
  </section>

  <section className="quote-section reveal-block">
   <div className="quote-mark">“</div>
   <div><p className="section-index">07 / UNOFFICIAL RECORD</p><h2>Some websites<br/>need a reason.<br/><em>This one needs a vibe.</em></h2><p className="quote-caption">A completely unnecessary statement, preserved permanently.</p></div>
  </section>

  <section className="archive-strip reveal-block">
   <div className="lux-label"><span>08 / ARCHIVE STRIP</span><span>SELECTED FRAGMENTS</span></div>
   <div className="strip-grid"><div className="strip-card one"><small>FRAME 001</small><b>THE<br/>START.</b></div><div className="strip-card two"><small>FRAME 002</small><b>THE<br/>CHAOS.</b></div><div className="strip-card three"><small>FRAME 003</small><b>THE<br/>LEGACY.</b></div></div>
  </section>

  <section className="final-index reveal-block">
   <div className="final-index-top"><span>09 / FINAL CHECK</span><span>LYKA FIELD SYSTEM</span></div>
   <div className="final-index-body"><div><small>IF YOU MADE IT THIS FAR</small><h2>You were<br/><em>supposed to.</em></h2></div><TransitionLink href="/archive" className="lux-btn fill">ENTER THE ARCHIVE <b>↗</b></TransitionLink></div>
  </section>

  <section className="closing"><div className="closing-grid" aria-hidden="true"><i/><i/><i/><i/></div><div className="lux-label">04 / END OF TRANSMISSION</div><h2>COME FOR THE<br/><em>DESIGN.</em><br/>STAY FOR THE CHAOS.</h2><TransitionLink href="/hq" className="lux-btn fill">OPEN HQ <b>↗</b></TransitionLink></section>
 </div>
}