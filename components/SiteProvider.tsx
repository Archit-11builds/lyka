"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Danger = "GHEE KHATAM" | "COOL OVERFLOW" | "SYSTEM BROKE" | null;
type State = {
  coolCount:number; ghee:number; sixMode:boolean; danger:Danger;
  bumpCool:()=>void; spendGhee:(n:number)=>void; refillGhee:()=>void;
  setSixMode:(v:boolean)=>void; clearDanger:()=>void;
};
const C=createContext<State|null>(null);
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
const storageKey="lyka-ultimate-v17";

export function SiteProvider({children}:{children:React.ReactNode}){
  const [coolCount,setCoolCount]=useState(0);
  const [ghee,setGhee]=useState(72);
  const [sixMode,setSixModeState]=useState(false);
  const [danger,setDanger]=useState<Danger>(null);

  useEffect(()=>{
    try{
      const x=JSON.parse(localStorage.getItem(storageKey)||"null");
      if(x){
        if(typeof x.coolCount==="number") setCoolCount(Math.max(0,x.coolCount));
        if(typeof x.ghee==="number") setGhee(clamp(x.ghee,0,100));
      }
    }catch{}
  },[]);

  useEffect(()=>{
    try{localStorage.setItem(storageKey,JSON.stringify({coolCount,ghee}))}catch{}
  },[coolCount,ghee]);

  const spendGhee=(n:number)=>setGhee(v=>{
    const next=clamp(v-n,0,100);
    if(next===0&&v>0)setDanger("GHEE KHATAM");
    return next;
  });

  const bumpCool=()=>{
    setCoolCount(v=>{
      const next=v+1;
      if(next>0&&next%12===0)setDanger("COOL OVERFLOW");
      return next;
    });
    if(Math.random()<0.78) spendGhee(1+Math.floor(Math.random()*5));
  };

  const refillGhee=()=>{setGhee(72);setDanger(null)};
  const setSixMode=(v:boolean)=>setSixModeState(v);
  const value=useMemo(()=>({coolCount,ghee,sixMode,danger,bumpCool,spendGhee,refillGhee,setSixMode,clearDanger:()=>setDanger(null)}),[coolCount,ghee,sixMode,danger]);
  return <C.Provider value={value}>{children}</C.Provider>;
}
export function useSite(){
  const x=useContext(C);
  if(!x) throw new Error("useSite must be used inside SiteProvider");
  return x;
}
