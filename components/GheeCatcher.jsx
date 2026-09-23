'use client';
import {useEffect,useState} from 'react';
import {useSite} from './SiteProvider';

export function GheeCatcher({onCatch}){
  const {ghee,cool,refill}=useSite();
  const [score,setScore]=useState(0),[streak,setStreak]=useState(0),[active,setActive]=useState(false),[pos,setPos]=useState({x:50,y:50}),[time,setTime]=useState(20);
  useEffect(()=>{if(!active)return;const id=setInterval(()=>setTime(t=>Math.max(0,t-1)),1000);return()=>clearInterval(id)},[active]);
  useEffect(()=>{if(active&&time===0){setActive(false);setStreak(0)}},[time,active]);
  useEffect(()=>{if(!active)return;const id=setInterval(()=>setPos({x:10+Math.random()*78,y:14+Math.random()*68}),900);return()=>clearInterval(id)},[active]);
  const start=()=>{setScore(0);setStreak(0);setTime(20);setPos({x:50,y:50});setActive(true)};
  const catchIt=()=>{if(!active)return;setScore(s=>s+1);setStreak(s=>s+1);refill(Math.min(100,ghee+5));setPos({x:10+Math.random()*78,y:14+Math.random()*68});onCatch?.()};
  return <div className="ghee-game">
    <div className="ghee-game-head"><div><span>RESOURCE LAB / 01</span><b>GHEE CATCHER</b></div><button onClick={start}>{active?'RESTART':'PLAY'}</button></div>
    <div className="ghee-game-arena"><div className="ghee-game-grid"/>
      <div className="ghee-game-hud"><span>{active?String(time).padStart(2,'0'):'--'}s</span><b>{score} CATCHES</b><span>×{streak}</span></div>
      {active?<button aria-label="Catch ghee" className="ghee-drop" style={{left:pos.x+'%',top:pos.y+'%'}} onClick={catchIt}>🥣</button>:<div className="ghee-game-idle"><strong>Catch the reserve.</strong><small>Tap the moving bowl before the clock runs out.</small></div>}
    </div>
    <div className="ghee-game-footer"><span>RESERVE <b>{ghee}%</b></span><span>COOL <b>{cool}</b></span><span>{active?'LIVE SESSION':'READY'}</span></div>
  </div>;
}