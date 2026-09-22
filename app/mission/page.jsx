'use client';

import { useEffect, useState } from 'react';
import { orbitEvents } from '../../lib/data';
import { useSite } from '../../components/SiteProvider';
import { Reveal } from '../../components/Reveal';

export default function Mission() {
  const { spend } = useSite();
  const [running,setRunning]=useState(false);
  const [fuel,setFuel]=useState(92);
  const [stability,setStability]=useState(86);
  const [score,setScore]=useState(0);
  const [target,setTarget]=useState(0);
  const [event,setEvent]=useState(orbitEvents[0]);
  const [scan,setScan]=useState(false);

  useEffect(()=>{
    if(!running) return;
    const id=setInterval(()=>{
      setTarget(v=>(v+1)%12);
      setFuel(v=>Math.max(0,v-1));
      setStability(v=>Math.max(0,v-(Math.random()>.72?2:0)));
      if(Math.random()>.68)setEvent(orbitEvents[Math.floor(Math.random()*orbitEvents.length)]);
    },900);
    return()=>clearInterval(id);
  },[running]);

  const maneuver=(type)=>{
    if(type==='boost'){setFuel(v=>Math.max(0,v-8));setStability(v=>Math.max(0,v-3));spend(2);setScore(v=>v+12)}
    if(type==='brake'){setStability(v=>Math.min(100,v+9));setScore(v=>v+6)}
    if(type==='reroute'){setTarget(v=>(v+4)%12);setFuel(v=>Math.max(0,v-3));setScore(v=>v+10)}
    setEvent(orbitEvents[Math.floor(Math.random()*orbitEvents.length)]);
  };

  return <div className="page mission-page">
    <div className="page-title mission-title">
      <div><span className="eyebrow">ROOM 03 / LYKA-01 / FLIGHT DECK</span><h1>Run the <em>mission.</em></h1><p className="lede">A small orbital game. Keep the ship stable, hit the route gates and don't waste the ghee budget.</p></div>
      <div className="mission-score"><span>SCORE</span><b>{score.toString().padStart(4,'0')}</b><small>MISSION / 032</small></div>
    </div>

    <Reveal className="mission-game">
      <section className="flight-map">
        <div className="map-top"><span>LIVE ORBIT / SECTOR 032</span><b>{running?'TRACKING':'STANDBY'}</b></div>
        <div className="space-grid"/>
        <div className="planet-large"><span>EARTH<br/>03</span></div>
        <div className="orbit-path path-a"/><div className="orbit-path path-b"/>
        <div className="route-gates">{Array.from({length:12},(_,i)=><i key={i} className={target===i?'hit':''} style={{transform:'rotate('+i*30+'deg) translateY(-185px)'}}/> )}</div>
        <div className="ship" style={{transform:'rotate('+target*30+'deg) translateY(-185px)'}}><b>LYKA</b></div>
        <div className="map-readout"><small>TRANSMISSION</small><p>{event}</p></div>
        <div className="scan-line"/>
      </section>

      <aside className="mission-control glass">
        <div className="control-head"><span>MISSION CONTROL</span><b>{running?'● LIVE':'○ PAUSED'}</b></div>
        {[['FUEL',fuel],['STABILITY',stability]].map(([label,value])=><div className="flight-stat" key={label}><div><span>{label}</span><b>{value}%</b></div><i><b style={{width:value+'%'}}/></i></div>)}
        <div className="control-divider"/>
        <small className="control-label">MANEUVER</small>
        <div className="maneuvers"><button onClick={()=>maneuver('boost')}>BOOST <b>−8</b></button><button onClick={()=>maneuver('brake')}>STABILISE <b>+9</b></button><button onClick={()=>maneuver('reroute')}>REROUTE <b>↻</b></button></div>
        <button className="launch-button" onClick={()=>setRunning(v=>!v)}>{running?'PAUSE MISSION':'LAUNCH LYKA-01'} <span>↗</span></button>
        <button className="deep-scan" onClick={()=>setScan(v=>!v)}>{scan?'CLOSE SCAN':'OPEN DEEP SCAN'}</button>
        {scan&&<div className="deep-scan-box"><span>DEEP SCAN / 06</span><b>ANIK-032</b><p>ORBITAL SIGNAL: STABLE<br/>UNKNOWN OBJECTS: 03<br/>GHEE RESERVE: DETECTED<br/>MATHS SIR TRANSMISSION: ACTIVE</p></div>}
      </aside>
    </Reveal>
  </div>