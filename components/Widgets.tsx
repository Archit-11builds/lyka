"use client";
import { useState } from "react";
import { useSite } from "@/components/SiteProvider";
import { jokes } from "@/lib/jokes";

export function CoolPanel(){
  const {coolCount,bumpCool}=useSite();
  const [line,setLine]=useState("Bhai ne cool hone ka attempt officially band nahi kiya.");
  const handle=()=>{bumpCool();setLine(jokes[Math.floor(Math.random()*jokes.length)]);};
  return <div className="glass-panel action-card">
    <div className="kicker">BAN GAYA COOL™</div><div className="mega">×{coolCount}</div>
    <div className="meter"><span style={{width:`${Math.min(100,8+coolCount*7)}%`}}/></div>
    <button className="btn primary" onClick={handle}>BAN GAYA COOL</button>
    <div className="result"><span className="kicker">LIVE VERDICT</span><p>{line}</p></div>
  </div>
}

const refillQuestions=[
 {q:"Anik ke father ka naam?",a:"Khali",opts:["Khali","Maths Sir","Anuradha","Lyka"]},
 {q:"Anik ka favourite + worst subject?",a:"Maths",opts:["Maths","Science","English","Anuched"]},
 {q:"Anuradha se Anu ke baad kya banta hai?",a:"Anuched",opts:["Anuched","Orbit","Ghee","Six"]},
 {q:"Ghee 0% par kya aata hai?",a:"RED DANGER",opts:["RED DANGER","Bonus Ghee","Free Rank","Maths Break"]}
];

export function GheePanel(){
  const {ghee,spendGhee,refillGhee}=useSite();
  const [open,setOpen]=useState(false),[question,setQuestion]=useState(refillQuestions[0]),[answer,setAnswer]=useState(""),[message,setMessage]=useState("Refill free mein nahi milta. Pehle proof do."),[cooldown,setCooldown]=useState(0);
  const begin=()=>{if(cooldown>0)return;const q=refillQuestions[Math.floor(Math.random()*refillQuestions.length)];setQuestion(q);setAnswer("");setMessage("Sahi jawab de, phir thoda ghee release hoga.");setOpen(true)};
  const submit=(v:string)=>{setAnswer(v);if(v!==question.a){setMessage("Galat. Ghee ke saath patience bhi low ho gaya.");return;}setMessage("Sahi. Supply release ho rahi hai...");window.setTimeout(()=>{refillGhee();setOpen(false);setCooldown(18);let left=18;const id=window.setInterval(()=>{left--;setCooldown(left);if(left<=0)window.clearInterval(id)},1000)},450)};
  return <div className="glass-panel action-card">
    <div className="kicker">GLOBAL GHEE RESERVE</div><div className="mega ghee-number">{ghee}%</div>
    <div className={`meter ${ghee<25?"danger-meter":""}`}><span style={{width:`${ghee}%`}}/></div>
    <p>{ghee===0?"GHEE KHATAM. RED DANGER active.":ghee<25?"Bhai reserve ko dekh ke system bhi chup ho gaya.":"Abhi chal raha hai. Faltu me mat uda."}</p>
    <div className="button-row"><button className="btn" onClick={()=>spendGhee(8)} disabled={ghee<8}>Ghee uda</button><button className="btn" onClick={begin} disabled={cooldown>0}>{cooldown?`Refill ${cooldown}s`:`Refill challenge`}</button></div>
    <div className="result"><span className="kicker">PROTOCOL</span><p>Ghee refill ke liye random lore question sahi hona chahiye.</p></div>
    {open&&<div className="modal" onClick={()=>setOpen(false)}><div className="modal-card" onClick={e=>e.stopPropagation()}><span className="kicker">GHEE REFILL CHALLENGE</span><h2>{question.q}</h2><div className="answer-grid">{question.opts.map(v=><button key={v} className={answer===v?(v===question.a?"correct":"wrong"):""} onClick={()=>submit(v)}>{v}</button>)}</div><p className="modal-note">{message}</p><button className="btn ghost" onClick={()=>setOpen(false)}>Baad mein</button></div></div>}
  </div>
}
