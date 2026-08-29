"use client";
import { CoolPanel, GheePanel } from "@/components/Widgets";
import { jokes } from "@/lib/jokes";
import { useState } from "react";
export default function Roast(){const [line,setLine]=useState(jokes[0]);return <div className="page"><header className="page-head"><span className="eyebrow">ROAST LAB / LIVE</span><h1>Thoda confidence.<br/><span>Thoda reality.</span></h1><p className="lede">Bhai button daba. Verdict dekh. Phir decide kar ki ban gaya cool ya bas laga aisa.</p></header><div className="grid-2"><CoolPanel/><section className="glass-panel action-card"><span className="kicker">SANKI SCIENTIST</span><div className="scanner"><div className="scanline"/><div className="scan-core">?</div></div><button className="btn" onClick={()=>setLine(jokes[Math.floor(Math.random()*jokes.length)])}>Reality Check</button><div className="result"><span className="kicker">FRESH FINDING</span><p>{line}</p></div></section></div><section className="section"><GheePanel/></section></div>}
