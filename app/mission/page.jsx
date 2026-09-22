'use client';
import{useEffect,useMemo,useState}from'react';
import{orbitEvents}from'../../lib/data';
import{useSite}from'../../components/SiteProvider';
import{Reveal}from'../../components/Reveal';

const phases=['EARTH','LAUNCH','ORBIT','TRAVEL','APPROACH','PLANET'];
const destinations=[
 {name:'MARS',distance:100,color:'red',desc:'Dry. Cold. Suspiciously quiet.'},
 {name:'EUROPA',distance:120,color:'blue',desc:'Ice shell. Ocean below. Signal detected.'},
 {name:'SATURN',distance:140,color:'gold',desc:'Rings ahead. Navigation gets tricky.'}
];

export default function Mission(){
 const{spend}=useSite();
 const[phase,setPhase]=useState(0),[fuel,setFuel]=useState(100),[hull,setHull]=useState(100),[oxygen,setOxygen]=useState(100),[distance,setDistance]=useState(0),[score,setScore]=useState(0),[destination,setDestination]=useState(destinations[0]),[message,setMessage]=useState('Select a destination, then launch from Earth.'),[running,setRunning]=useState(false),[event,setEvent]=useState(orbitEvents[0]),[scan,setScan]=useState(false),[engine,setEngine]=useState(0),[landed,setLanded]=useState(false),[shield,setShield]=useState(100),[cargo,setCargo]=useState(0),[hazard,setHazard]=useState(false);

 useEffect(()=>{
  if(!running)return;
  const id=setInterval(()=>{
   setEngine(v=>(v+1)%12);
   setOxygen(v=>Math.max(0,v-.35));
   setFuel(v=>Math.max(0,v-.45));
   if(Math.random()>.72){const e=orbitEvents[Math.floor(Math.random()*orbitEvents.length)];setEvent(e);if(Math.random()>.62){setHazard(true);setMessage('WARNING / '+e);}}
   if(phase>=3)setDistance(v=>Math.min(destination.distance,v+1.45));
  },700);
  return()=>clearInterval(id);
 },[running,phase,destination.distance]);

 useEffect(()=>{
  if(!running)return;
  if(phase===1&&fuel<82){setPhase(2);setMessage('ORBIT ACHIEVED. Earth is behind you.');}
  if(phase>=3&&distance>=destination.distance){setPhase(5);setRunning(false);setLanded(true);setMessage(destination.name+' ARRIVAL CONFIRMED. Welcome to the surface.');setScore(v=>v+100+cargo*15);setHazard(false);}
  if(oxygen<=0||fuel<=0||hull<=0){setRunning(false);setMessage('MISSION ABORTED. Resources exhausted. Return to Earth and retry.');}
 },[fuel,oxygen,hull,distance,phase,running,destination.name,destination.distance]);

 const selectDestination=d=>{if(phase===0||phase===2){setDestination(d);setMessage('COURSE LOCKED: '+d.name+'. Ready for launch.')}};
 const launch=()=>{
  if(phase===0){setPhase(1);setRunning(true);setScore(v=>v+10);setMessage('LAUNCH SEQUENCE ACTIVE. Thrust nominal.');}
  else if(phase===2){setPhase(3);setRunning(true);setScore(v=>v+20);setMessage('BURN COMPLETE. Deep-space travel initiated.');}
  else if(phase===3){setPhase(4);setMessage('APPROACH VECTOR SET. Prepare for arrival.');}
  else if(phase===5){setPhase(0);setDistance(0);setFuel(100);setOxygen(100);setHull(100);setScore(0);setLanded(false);setMessage('LYKA-01 returned to Earth. Select a new mission.');}
 };
 const collect=()=>{if(!running||phase<3)return;setCargo(v=>v+1);setFuel(v=>Math.min(100,v+14));setScore(v=>v+18);setMessage('CARGO RECOVERED. +14 FUEL. '+(cargo+1)+' OBJECTS SECURED.');};
 const maneuver=t=>{
  if(t==='boost'&&fuel>=8){setFuel(v=>Math.max(0,v-8));setHull(v=>Math.max(0,v-2));setDistance(v=>Math.min(destination.distance,v+5));setScore(v=>v+12);spend(1);setMessage('BOOST BURN. '+Math.round(distance)+' KM / COURSE ADVANCED.');}
  if(t==='brake'){setFuel(v=>Math.max(0,v-3));setHull(v=>Math.min(100,v+4));setScore(v=>v+5);setMessage('BRAKING VECTOR STABLE.');}
  if(t==='scan'){setScan(v=>!v);setScore(v=>v+3);setMessage(scan?'SCAN STOWED.':'DEEP SCAN FOUND A DRIFTING SUPPLY CACHE.');} if(t==='shield'&&fuel>=5){setFuel(v=>v-5);setShield(v=>Math.min(100,v+35));setMessage('SHIELD CHARGED.');}
 };
 const reset=()=>{setPhase(0);setFuel(100);setHull(100);setOxygen(100);setDistance(0);setScore(0);setRunning(false);setLanded(false);setScan(false);setShield(100);setCargo(0);setHazard(false);setMessage('Select a destination, then launch from Earth.')};
 const progress=useMemo(()=>Math.min(100,phase===0?0:phase===1?12:phase===2?25:25+(distance/destination.distance)*75),[phase,distance,destination.distance]);

 return <div className="page mission-page mission-v4">
  <div className="page-title mission-title"><div><span className="eyebrow">ROOM 03 / LYKA-01 / SPACE PROGRAM</span><h1>Earth to <em>deep space.</em></h1><p className="lede">Launch from Earth, reach orbit, choose a world and manage LYKA-01 all the way to arrival.</p></div><div className="mission-score"><span>MISSION SCORE</span><b>{String(score).padStart(4,'0')}</b><small>{phases[phase]} / {destination.name}</small></div></div>
  <div className="mission-modebar glass"><div><b>{phases[phase]}</b><span> → {destination.name}</span></div><div className="mission-progress"><i style={{width:progress+'%'}}/></div><button onClick={reset}>RESET ↻</button></div>
  <div className="destination-row">{destinations.map(d=><button key={d.name} className={destination.name===d.name?'active':''} disabled={phase===1||phase===3||phase===4} onClick={()=>selectDestination(d)}><span>DESTINATION</span><b>{d.name}</b><small>{d.distance} AU / {d.desc}</small></button>)}</div>
  <Reveal className="mission-game">
   <section className={'flight-map space-'+phase}>
    <div className="space-stars">{Array.from({length:34},(_,i)=><i key={i} style={{left:((i*37)%100)+'%',top:((i*61)%100)+'%',animationDelay:(i%7)*.3+'s'}}/>)}</div>
    <div className="map-top"><span>{phases[phase]} / {phase>=3?'DEEP SPACE':'EARTH ORBIT'}</span><b>{running?'● FLIGHT ACTIVE':'○ STANDBY'}</b></div>
    <div className="sun-core"/><div className="earth-body"><span>EARTH</span></div><div className={'target-planet '+destination.color+' '+(phase===5?'arrived':'')}><span>{destination.name}</span></div>
    <div className="space-route"><i style={{width:progress+'%'}}/></div>
    <div className="space-ship" style={{left:Math.max(8,Math.min(88,progress))+'%'}}><b>LYKA-01</b><i/></div>
    <div className="flight-message"><small>FLIGHT COMPUTER</small><p>{message}</p><span>EVENT / {event}</span>{hazard&&<b className="hazard-alert">⚠ HAZARD WINDOW / SHIELD ADVISED</b>}</div>
    <div className="planet-readout"><span>RANGE</span><b>{phase>=3?Math.round(distance):'—'}</b><small>{phase>=3?'AU':'KM'}</small></div>
    {landed&&<div className="arrival-badge">✓ PLANET ARRIVAL<br/><small>MISSION COMPLETE</small></div>}
   </section>
   <aside className="mission-control glass"><div className="control-head"><span>MISSION CONTROL</span><b>{running?'LIVE':'PAUSED'}</b></div>
    <div className="resource"><span>FUEL</span><b>{Math.round(fuel)}%</b><i><b style={{width:fuel+'%'}}/></i></div>
    <div className="resource"><span>HULL</span><b>{Math.round(hull)}%</b><i><b style={{width:hull+'%'}}/></i></div>
    <div className="resource"><span>OXYGEN</span><b>{Math.round(oxygen)}%</b><i><b style={{width:oxygen+'%'}}/></i></div><div className="resource"><span>SHIELD</span><b>{Math.round(shield)}%</b><i><b style={{width:shield+'%'}}/></i></div><div className="resource"><span>CARGO</span><b>{cargo}</b><i><b style={{width:Math.min(100,cargo*20)+'%'}}/></i></div>
    <div className="control-divider"/><small className="control-label">FLIGHT DECK</small>
    <div className="maneuvers"><button disabled={!running||phase<3} onClick={()=>maneuver('boost')}>BOOST <b>−8 F</b></button><button disabled={!running} onClick={()=>maneuver('brake')}>BRAKE <b>−3 F</b></button><button disabled={!running||phase<3} onClick={collect}>COLLECT <b>+CARGO</b></button><button onClick={()=>maneuver('scan')}>DEEP SCAN <b>⌁</b></button><button disabled={!running||phase<3} onClick={()=>maneuver('shield')}>SHIELD <b>−5 F</b></button></div>
    <button className="launch-button" onClick={launch}>{phase===0?'LAUNCH FROM EARTH':phase===2?'ENTER DEEP SPACE':phase===3?'BEGIN APPROACH':phase===5?'RETURN TO EARTH':'FLIGHT ACTIVE'} <span>↗</span></button>
    {scan&&<div className="deep-scan-box"><span>DEEP SCAN / ACTIVE</span><b>{destination.name} SIGNAL</b><p>OBJECTS: {phase>=3?'07':'—'}<br/>GHEE RESERVE: DETECTED<br/>ANIK-032: TRACKED<br/>ROUTE: {Math.round(progress)}%</p></div>}
   </aside>
  </Reveal>
 </div>
}