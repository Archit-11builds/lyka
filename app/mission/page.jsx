'use client';

import { useEffect, useMemo, useState } from 'react';
import { orbitEvents } from '../../lib/data';
import { useSite } from '../../components/SiteProvider';
import { Reveal } from '../../components/Reveal';

const phases = ['EARTH', 'ORBIT', 'DEEP SPACE', 'APPROACH', 'PLANET'];
const destinations = [
  { name: 'MARS', color: 'red', distance: 100, difficulty: 'LOW', desc: 'Dust storms. Old signal. Classic.' },
  { name: 'EUROPA', color: 'blue', distance: 120, difficulty: 'MED', desc: 'Ice shell. Ocean below. Signal detected.' },
  { name: 'SATURN', color: 'gold', distance: 140, difficulty: 'HIGH', desc: 'Rings ahead. Navigation gets tricky.' }
];

export default function Mission() {
  const { spend } = useSite();
  const [phase, setPhase] = useState(0), [destination, setDestination] = useState(destinations[0]);
  const [fuel, setFuel] = useState(100), [hull, setHull] = useState(100), [oxygen, setOxygen] = useState(100);
  const [shield, setShield] = useState(70), [orbit, setOrbit] = useState(0), [distance, setDistance] = useState(0);
  const [score, setScore] = useState(0), [cargo, setCargo] = useState(0), [scan, setScan] = useState(false);
  const [heat, setHeat] = useState(18), [message, setMessage] = useState('Choose a world. Then launch LYKA-01.');
  const [event, setEvent] = useState('SYSTEM NOMINAL'), [hazard, setHazard] = useState(false);
  const [missionComplete, setMissionComplete] = useState(false), [telemetry, setTelemetry] = useState(7420); const [eventLog,setEventLog]=useState([]);
  const [assist, setAssist] = useState('BALANCED');
  const [flightGrade, setFlightGrade] = useState('—');

  useEffect(() => {
    const id = setInterval(() => {
      setTelemetry(v => v + Math.floor(Math.random() * 17));
      if (phase > 0 && phase < 4) setOxygen(v => Math.max(0, v - 0.18));
    }, 1200);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(()=>{ if(event) setEventLog(v=>[{time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'}),event},...v].slice(0,8)); },[event]);

  const progress = useMemo(() => {
    if (phase === 0) return 0;
    if (phase === 1) return 14 + orbit * 11;
    if (phase === 2) return 30 + (distance / destination.distance) * 48;
    if (phase === 3) return 78 + (distance >= destination.distance * .86 ? 10 : 0);
    return 100;
  }, [phase, orbit, distance, destination.distance]);

  const selectDestination = next => {
    if (phase === 0) { setDestination(next); setMessage('COURSE LOCKED / ' + next.name + '. Select a flight profile, then launch.'); }
  };
  const applyAssist = profile => {
    if (phase !== 0) return;
    setAssist(profile);
    setMessage(profile === 'SAFE' ? 'SAFE PROFILE / stronger shields, lower score multiplier.' : profile === 'FAST' ? 'FAST PROFILE / higher score, tighter resource margins.' : 'BALANCED PROFILE / standard LYKA-01 parameters.');
    setEvent('FLIGHT PROFILE / ' + profile);
  };
  const launch = () => {
    if (phase !== 0) return;
    setPhase(1); setFuel(v => v - 8); setScore(v => v + (assist === 'FAST' ? 130 : assist === 'SAFE' ? 80 : 100));
    setMessage('Launch clean. Now stabilize the orbital insertion.'); setEvent('ASCENT / THRUST NOMINAL');
  };
  const stabilizeOrbit = () => {
    if (phase !== 1 || orbit >= 3 || fuel < 4) return;
    setFuel(v => Math.max(0, v - 4)); setOrbit(v => v + 1); setHeat(v => Math.min(100, v + 8)); setScore(v => v + 80);
    setMessage(orbit === 2 ? 'ORBIT LOCKED. You have a clean departure window.' : 'Orbital burn accepted. Keep LYKA-01 stable.');
    setEvent(orbit === 2 ? 'ORBIT LOCK / GREEN WINDOW' : 'ORBIT CORRECTION / NOMINAL');
  };
  const depart = () => {
    if (phase !== 1 || orbit < 3) return;
    setPhase(2); setMessage('Gravity assist engaged. Deep-space travel is now manual.'); setEvent('DEPARTURE / GRAVITY ASSIST'); setScore(v => v + 150);
  };
  const travel = () => {
    if (phase !== 2 || fuel < 6) return;
    const roll = Math.random(), advance = 7 + Math.floor(Math.random() * 7);
    setFuel(v => Math.max(0, v - 6)); setDistance(v => Math.min(destination.distance, v + advance)); setHeat(v => Math.min(100, v + 5)); setScore(v => v + 55);
    if (roll > .7) {
      const e = orbitEvents[Math.floor(Math.random() * orbitEvents.length)];
      setEvent(e); setHazard(true); setMessage('HAZARD / ' + e);
      setHull(v => Math.max(0, v - 4)); setShield(v => Math.max(0, v - 8));
    } else {
      setHazard(false); setEvent('DEEP SPACE / COURSE STABLE'); setMessage('Burn complete. Route advanced by ' + advance + ' AU.');
    }
    setOxygen(v => Math.max(0, v - 1.2));
  };
  const scanSpace = () => {
    if (phase < 2 || scan) return;
    setScan(true); setScore(v => v + 90); setMessage('LONG-RANGE SCAN found a drifting supply cache.'); setEvent('SCAN / UNKNOWN OBJECT');
  };
  const collect = () => {
    if (!scan || phase !== 2 || cargo >= 3) return;
    setCargo(v => v + 1); setFuel(v => Math.min(100, v + 10)); setShield(v => Math.min(100, v + 8)); setScore(v => v + 120);
    setMessage('Cache secured. +10 fuel / +8 shield.'); setEvent('CARGO / RECOVERED'); setScan(false);
  };
  const shieldUp = () => {
    if (phase < 2 || fuel < 5) return;
    setFuel(v => v - 5); setShield(v => Math.min(100, v + 30)); setHeat(v => Math.min(100, v + 4)); setHazard(false);
    setMessage('Shield array charged. Hazard window neutralized.'); setEvent('SHIELD / CHARGED');
  };
  const burnHeat = () => {
    if (heat < 8) return;
    setHeat(v => Math.max(0, v - 24)); setFuel(v => Math.max(0, v - 3)); setScore(v => v + 40);
    setMessage('Radiators opened. Heat dumped into deep space.'); setEvent('THERMAL / STABLE');
  };
  const advanceToApproach = () => {
    if (phase !== 2 || distance < destination.distance * .78) return;
    setPhase(3); setMessage('Approach vector acquired. One final docking decision.'); setEvent('APPROACH / TARGET ACQUIRED'); setScore(v => v + 180);
  };
  const dock = () => {
    if (phase !== 3 || distance < destination.distance * .86) return;
    if (hull <= 20 || oxygen <= 8) { setMessage('DOCKING ABORTED. Hull or oxygen is too low.'); setEvent('ABORT / SAFETY LIMIT'); return; }
    setPhase(4); setMissionComplete(true);
    const finalHealth = Math.round((fuel + hull + oxygen + shield) / 4);
    const grade = finalHealth >= 85 && cargo >= 2 ? 'S' : finalHealth >= 70 ? 'A' : finalHealth >= 50 ? 'B' : 'C';
    setFlightGrade(grade);
    setScore(v => v + 500 + cargo * 100 + (grade === 'S' ? 300 : grade === 'A' ? 150 : 0));
    setMessage(destination.name + ' arrival confirmed. Mission complete.'); setEvent('LANDING / SUCCESS');
  };
  const emergency = () => {
    if (phase === 0 || fuel < 8) return;
    setFuel(v => Math.max(0, v - 8)); setHull(v => Math.max(0, v - 5)); setOxygen(v => Math.max(0, v - 3));
    setHeat(v => Math.max(0, v - 15)); setShield(v => Math.max(0, v - 20)); setMessage('Emergency correction. You survived it, somehow.');
    setEvent('MANUAL OVERRIDE'); setScore(v => Math.max(0, v - 20)); spend(1);
  };
  const reset = () => {
    setPhase(0); setOrbit(0); setDistance(0); setFuel(100); setHull(100); setOxygen(100); setShield(70);
    setCargo(0); setScore(0); setHeat(18); setScan(false); setHazard(false); setMissionComplete(false);
    setMessage('Choose a world. Select a flight profile. Then launch LYKA-01.'); setEvent('SYSTEM NOMINAL'); setEventLog([]); setAssist('BALANCED'); setFlightGrade('—');
  };
  const health = Math.round((fuel + hull + oxygen + shield) / 4);

  return <div className="page mission-page mission-v5">
    <div className="page-title mission-title"><div><span className="eyebrow">ROOM 03 / LYKA-01 / SPACE PROGRAM</span><h1>Earth to <em>deep space.</em></h1><p className="lede">A proper flight deck: stabilize orbit, manage resources, dodge hazards, collect cargo and dock at your chosen world.</p></div><div className="mission-score"><span>MISSION SCORE</span><b>{String(score).padStart(4,'0')}</b><small>{phases[phase]} / {destination.name} {missionComplete ? '· GRADE '+flightGrade : ''}</small></div></div>
    <div className="mission-modebar glass"><div><b>{phases[phase]}</b><span> → {destination.name}</span></div><div className="mission-progress"><i style={{width:Math.min(100,progress)+'%'}}/></div><span className="mission-telemetry">TLM {telemetry.toLocaleString()} KM</span><button onClick={reset}>RESET ↻</button></div>
    <div className="destination-row mission-destinations">{destinations.map(d=><button key={d.name} className={destination.name===d.name?'active':''} disabled={phase!==0} onClick={()=>selectDestination(d)}><span>DESTINATION / {d.difficulty}</span><b>{d.name}</b><small>{d.distance} AU · {d.desc}</small></button>)}</div>
    <section className="mission-brief glass">
      <div><span>FLIGHT PROFILE</span><b>{assist}</b><small>Changes resource margins and launch score.</small></div>
      <div className="mission-profiles">
        {['SAFE','BALANCED','FAST'].map(profile=><button key={profile} className={assist===profile?'active':''} disabled={phase!==0} onClick={()=>applyAssist(profile)}><b>{profile}</b><small>{profile==='SAFE'?'+shield / −score':' '+(profile==='FAST'?'+score / −margin':'standard profile')}</small></button>)}
      </div>
      <div className="mission-objective"><span>OBJECTIVE</span><b>{missionComplete ? destination.name+' SECURED / GRADE '+flightGrade : phase===0 ? 'SELECT WORLD → PROFILE → LAUNCH' : phase===1 ? 'STABILIZE 3 ORBIT LOCKS' : phase===2 ? 'REACH 78% + MANAGE SYSTEMS' : phase===3 ? 'DOCK ABOVE 86%' : 'MISSION COMPLETE'}</b></div>
    </section>
    <Reveal className="mission-game mission-game-v5">
      <section className={'flight-map space-'+phase+' '+destination.color}>
        <div className="space-stars">{Array.from({length:46},(_,i)=><i key={i} style={{left:((i*37)%100)+'%',top:((i*61)%100)+'%',animationDelay:(i%9)*.22+'s'}}/>)}</div><div className="nebula-glow"/>
        <div className="map-top"><span>{phases[phase]} / {phase>=2?'DEEP SPACE':'EARTH SYSTEM'}</span><b>{missionComplete?'● COMPLETE':phase?'● FLIGHT ACTIVE':'○ STANDBY'}</b></div>
        <div className="earth-system"><div className="sun-core"><span>SOL</span></div><div className="earth-body"><span>EARTH</span></div><div className="orbit-ring orbit-ring-a"/><div className="orbit-ring orbit-ring-b"/></div>
        <div className={'target-planet '+destination.color+' '+(phase===4?'arrived':'')}><span>{destination.name}</span></div>
        <div className="space-route"><i style={{width:Math.min(100,Math.max(8,progress))+'%'}}/></div>
        <div className="space-ship" style={{left:Math.max(9,Math.min(90,progress))+'%'}}><b>LYKA-01</b><i/><small>SPD {phase>=2?18:4} AU/H</small></div>
        {phase===1&&<div className="orbit-challenge"><span>ORBIT INSERTION</span><b>{orbit}/3 LOCKS</b><div><i style={{width:(orbit/3)*100+'%'}}/></div><small>Stabilize three orbital burns to unlock the deep-space departure window.</small></div>}
        {hazard&&<div className="space-hazard"><span>⚠</span><b>HAZARD WINDOW</b><small>Shield or emergency correction recommended.</small></div>}
        <div className="flight-message"><small>FLIGHT COMPUTER</small><p>{message}</p><span>EVENT / {event}</span></div><div className="planet-readout"><span>RANGE</span><b>{Math.round(distance)}</b><small>AU</small></div>
        {missionComplete&&<div className="arrival-badge">✓ {destination.name} ARRIVAL<br/><small>MISSION COMPLETE · {score} PTS</small></div>}
      </section>
      <aside className="mission-control glass"><div className="control-head"><span>MISSION CONTROL</span><b>{phase?'LIVE':'READY'}</b></div>
        {[['FUEL',fuel],['HULL',hull],['OXYGEN',oxygen],['SHIELD',shield],['HEAT',heat]].map(([label,value])=><div className="resource" key={label}><span>{label}</span><b>{Math.round(value)}%</b><i><b style={{width:Math.max(0,Math.min(100,value))+'%'}}/></i></div>)}
        <div className="resource cargo-resource"><span>CARGO</span><b>{cargo}/3</b><i><b style={{width:(cargo/3)*100+'%'}}/></i></div><div className="control-divider"/><small className="control-label">FLIGHT DECK</small>
        <div className="maneuvers mission-actions">
          <button disabled={phase!==0} onClick={launch}>LAUNCH <b>−8 F</b></button><button disabled={phase!==1||orbit>=3} onClick={stabilizeOrbit}>STABILIZE ORBIT <b>−4 F</b></button>
          <button disabled={phase!==1||orbit<3} onClick={depart}>DEPART <b>LOCKED</b></button><button disabled={phase!==2||fuel<6} onClick={travel}>BURN / TRAVEL <b>−6 F</b></button>
          <button disabled={phase!==2||distance<destination.distance*.78} onClick={advanceToApproach}>APPROACH <b>78%</b></button><button disabled={phase!==3||distance<destination.distance*.86} onClick={dock}>DOCK / LAND <b>86%</b></button>
          <button disabled={phase<2||scan||cargo>=3} onClick={scanSpace}>DEEP SCAN <b>+90</b></button><button disabled={!scan||phase!==2||cargo>=3} onClick={collect}>COLLECT CARGO <b>+10 F</b></button>
          <button disabled={phase<2||fuel<5} onClick={shieldUp}>SHIELD <b>−5 F</b></button><button disabled={phase<2||heat<8} onClick={burnHeat}>DUMP HEAT <b>−3 F</b></button>
          <button disabled={phase===0||fuel<8} onClick={emergency}>EMERGENCY CORRECTION <b>−8 F</b></button>
        </div>
        <div className="mission-mini"><div><span>SHIP HEALTH</span><b>{health}%</b></div><div><span>OBJECTIVE</span><b>{phase===0?'LAUNCH':phase===1?'LOCK ORBIT':phase===2?'REACH 78%':phase===3?'DOCK':'COMPLETE'}</b></div></div>
        {scan&&<div className="deep-scan-box"><span>DEEP SCAN / ACTIVE</span><b>UNKNOWN CACHE</b><p>OBJECTS: 03<br/>FUEL CELLS: 10<br/>ANIK-032: TRACKED<br/>ROUTE: {Math.round(progress)}%</p></div>}
      </aside><aside className="mission-log glass"><div><span>MISSION LOG</span><b>{eventLog.length.toString().padStart(2,'0')} EVENTS</b></div>{eventLog.length?eventLog.map((x,i)=><article key={i}><small>{x.time}</small><span>{x.event}</span></article>):<p>Flight events will appear here once LYKA-01 moves.</p>}</aside>
    </Reveal>
  </div>;
}
