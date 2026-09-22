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
   <div className="hero-orbit"><span>LYKA</span><i/><b>032</b></div><div className="hero-copy"><p className="kicker">THE UNNECESSARILY PREMIUM ARCHIVE</p><h1>ANIK<span>↗</span><br/><i>UNFILTERED.</i></h1><p className="hero-desc">A digital playground built around one person, too many inside jokes, questionable science and an unreasonable amount of attention to detail.</p><div className="hero-actions"><TransitionLink href="/hq" className="lux-btn fill">ENTER LYKA <b>↗</b></TransitionLink><TransitionLink href="/photos" className="lux-btn">VIEW ARCHIVE <b>01</b></TransitionLink></div></div>
   <div className="hero-art"><div className="hero-signal"><span>LIVE SIGNAL</span><b>032.84</b><i/></div><div className="hero-crosshair"><i/><i/></div><div className="art-card"><img src="/photos/anik-01.jpeg" alt="Anik"/><div className="art-shade"></div><div className="art-meta"><span>PORTRAIT / 001</span><b>ANIK</b></div></div><div className="art-ring r1"/><div className="art-ring r2"/><div className="art-float">LIVE<br/><strong>84</strong><small>ENERGY</small></div><div className="art-caption">NO SERIOUS BUSINESS<br/>BEYOND THIS POINT</div></div>
   <div className="scroll-mark"><span>SCROLL</span><i></i></div>
  </section>

  <section className="lux-marquee"><div>{quote} <b>✦</b> {quote} <b>✦</b> {quote} <b>✦</b></div></section>

  <section className="intro-block reveal-block"><div className="lux-label">01 / ABOUT THE THING</div><div><h2>It looks serious.<br/><em>It absolutely isn't.</em></h2><p>LYKA is a private little universe: part archive, part game room, part study lab. The surface is polished. The contents are not always.</p></div></section>

  <section className="feature-section reveal-block"><div className="lux-label">02 / EXPLORE LYKA <span>04 MODULES</span></div><div className="feature-grid">{cards.map(x=><TransitionLink key={x.h} href={x.h} className={'feature-card '+x.c}><div className="feature-num">{x.n}</div><div className="card-graphic"><i/><i/><i/></div><div className="feature-body"><small>{x.k}</small><h3>{x.t}</h3><p>{x.d}</p></div><div className="feature-arrow">↗</div></TransitionLink>)}</div></section>

  <div className="orbit-lines" aria-hidden="true"><i/><i/><i/></div><section className="split-feature"><div className="study-panel"><div className="lux-label">03 / DAILY DROP <span>HARD LAB</span></div><div className="challenge-number">0{challenge.right?3:1}</div><h2>{challenge.q}</h2><p>A random hard question from the LYKA Maths Lab. The answer is waiting inside.</p><TransitionLink href="/maths-sir" className="under-link">OPEN MATHS LAB <b>→</b></TransitionLink></div><div className="stats-panel"><div className="lux-label">LIVE / SESSION</div><div className="energy-read"><strong>{energy}</strong><span>%</span></div><div className="lux-bar"><i style={{width:energy+'%'}}/></div><div className="stat-row"><div><small>GHEE</small><b>{ghee}%</b></div><div><small>COOL</small><b>{cool}</b></div><div><small>STATUS</small><b>ACTIVE</b></div></div></div></section>

  <section className="closing"><div className="closing-grid" aria-hidden="true"><i/><i/><i/><i/></div><div className="lux-label">04 / END OF TRANSMISSION</div><h2>COME FOR THE<br/><em>DESIGN.</em><br/>STAY FOR THE CHAOS.</h2><TransitionLink href="/hq" className="lux-btn fill">OPEN HQ <b>↗</b></TransitionLink></section>
 </div>
}