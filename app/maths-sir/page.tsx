"use client";
import {useState} from "react";
import {GheePanel} from "@/components/Widgets";
const qs=[
 ["Agar x = 6, toh Anik ki confidence value?","6"],
 ["Maths favourite bhi, worst bhi. Isko kya bolenge?","paradox"],
 ["Ghee 0 ho gaya toh?","danger"],
 ["Ek kill ke baad kitni commentary?","17"]
];
export default function MathsSir(){const [i,setI]=useState(0),[a,setA]=useState(""),[n,setN]=useState("Question padho bhai. Confidence baad mein.");const q=qs[i];const check=()=>setN(a.trim().toLowerCase()===q[1].toLowerCase()?"Theek hai bhai, aaj bach gaya.":"Bhai question dobara padh. Confidence se marks nahi milte.");return <div className="page"><header className="page-head"><span className="eyebrow">PRIVATE TUITION / MATHS SIR</span><h1>Maths Sir ki <span>private class.</span></h1><p className="lede">One-to-one tuition. Board-style sawaal. Anik-style confidence.</p></header><div className="grid-2"><section className="glass-panel board"><div className="sir-badge">MS</div><span className="kicker">QUESTION {i+1} / 4</span><h2>{q[0]}</h2><input className="answer" value={a} onChange={e=>setA(e.target.value)} placeholder="Answer likh bhai..." onKeyDown={e=>{if(e.key==="Enter")check()}}/><div className="button-row"><button className="btn primary" onClick={check}>Check</button><button className="btn" onClick={()=>{setI(v=>(v+1)%qs.length);setA("");setN("Naya sawaal. Naya mauka.")}}>Next</button></div><div className="result"><span className="kicker">MATHS SIR NOTE</span><p>{n}</p></div></section><section className="glass-panel"><span className="kicker">CLASS STATUS</span><h2 className="large-copy">Simple question.<br/><span>Badi confidence.</span></h2><div className="mini-list"><span>● Personal tuition active</span><span>● Favourite + worst paradox active</span><span>● Anuched yahan allowed nahi</span><span>● Confidence marks se independent</span></div><GheePanel/></section></div></div>}
