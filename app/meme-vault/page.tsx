"use client"; import { Shell } from "@/components/Shell"; import { useState } from "react"; import { Shuffle, X } from "lucide-react";
const memes=[
 ["POV","Anik ne ek baar sahi answer diya","Bhai ne science ko rewrite kar diya."],
 ["GOPLA SIR","Private Maths Tuition","Teacher: solve karo. / Anik: pehle vibe check."],
 ["FREE FIRE","1 kill later","confidence patch v12.4 installed"],
 ["ANU","Anuradha → Anu","Anu → Anuched. Ye family business hai."],
 ["SIX","Gender database","System: 6? / Anik: haan bhai."],
 ["GHEE","Reserve alert","Thoda aur dabaya… GHEE KHATAM."],
 ["SCIENCE","Sanki Scientist","Hypothesis: main cool hoon. / Evidence: trust me bro."],
 ["HORSE","Jawline division","Equine department ne follow-up maanga hai."],
 ["KH A L I","Father field","Database me value: khali. Backup: khali."],
 ["COOL","Main best hoon","Everyone else: ban gaya cool."],
 ["SCHOOL","Maths favourite","Maths worst. / Literature me isko paradox bolte hain."],
 ["LYKA","Space dog","Earth ne export karne ki try ki, return ho gaya."],
];
export default function MemeVault(){const [open,setOpen]=useState<number|null>(null); const [order,setOrder]=useState(memes.map((_,i)=>i)); const shuffle=()=>setOrder([...order].sort(()=>Math.random()-.5)); return <Shell><div className="page-wrap"><div className="page-hero"><div><div className="eyebrow lime">MEME VAULT / 100% UNNECESSARY</div><h1>Archive se <span>zyada memes</span>.</h1><p>Scroll nahi karna? Cards kholo. Har card mein thoda aur nuksaan hai.</p></div><button className="button primary" onClick={shuffle}><Shuffle size={16}/> shuffle vault</button></div><div className="meme-grid">{order.map((idx,rank)=><button className="meme-card" key={idx} onClick={()=>setOpen(idx)}><span className="meme-label">{memes[idx][0]}</span><h3>{memes[idx][1]}</h3><p>{memes[idx][2]}</p><small>tap for full damage ↗</small></button>)}</div>{open!==null&&<div className="modal-backdrop" onClick={()=>setOpen(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setOpen(null)}><X/></button><span className="eyebrow">MEME #{String(open+1).padStart(2,"0")}</span><h2>{memes[open][1]}</h2><p>{memes[open][2]}</p><div className="modal-joke">BAN GAYA COOL.</div><button className="button primary" onClick={()=>setOpen(null)}>theek hai bhai</button></div></div>}</div></Shell>}
