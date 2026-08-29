'use client';
import { useEffect, useState } from 'react';
export function Intro(){
 const [show,setShow]=useState(true);
 useEffect(()=>{const t=setTimeout(()=>setShow(false),2200);return()=>clearTimeout(t)},[]);
 if(!show)return null;
 return <div className="intro"><div className="intro-stars"/><div className="intro-mark">🐕</div><small>FILE 006 / SUBJECT ACTIVATION</small><h1>LYKA</h1><p>Aapka Anik ki cool duniya mein swagat hai.</p><div className="intro-bar"><span/></div></div>
}
