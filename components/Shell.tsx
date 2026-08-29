"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSite } from "@/components/SiteProvider";

const routes=[
  ["/","Home"],["/roast","Roast"],["/memes","Memes"],["/maths-sir","Maths"],["/mission","Orbit"],["/archive","Files"]
] as const;

const tones:Record<string,string>={
  "/":"home","/roast":"roast","/memes":"meme","/maths-sir":"maths","/mission":"orbit","/archive":"archive","/six":"six","/lyka":"hq","/photos":"photo"
};

const exitQuestions=[
  {q:"Anik ke father ka naam?",a:["Khali","Maths Sir","Anuradha","Lyka"]},
  {q:"Anuradha se Anu ke baad kya banta hai?",a:["Anuched","Orbit","Ghee","Six"]},
  {q:"Anik ka favourite + worst subject?",a:["Maths","Science","English","Anuched"]},
  {q:"Ghee 0% par kya aata hai?",a:["RED DANGER","Bonus Ghee","Free Rank","Maths Break"]}
];

export function Shell({children}:{children:React.ReactNode}){
  const pathname=usePathname(); const router=useRouter();
  const {ghee,coolCount,sixMode,setSixMode,danger,clearDanger}=useSite();
  const [transition,setTransition]=useState(false);
  const [transitionTarget,setTransitionTarget]=useState("/");
  const [transitionLabel,setTransitionLabel]=useState("LYKA");
  const [hqBusy,setHqBusy]=useState(false);
  const [sixQuestion,setSixQuestion]=useState(exitQuestions[0]);
  const [sixError,setSixError]=useState("");
  const timeout=useRef<number|null>(null);

  const navigate=(href:string)=>{
    if(href===pathname||sixMode||transition)return;
    setTransitionTarget(href); setTransitionLabel(href==="/lyka"?"LYKA HQ":href==="/mission"?"ORBIT":href==="/maths-sir"?"MATHS SIR":href.slice(1).toUpperCase()||"LYKA"); setTransition(true);
    timeout.current=window.setTimeout(()=>router.push(href),560);
  };

  useEffect(()=>{
    if(!transition || pathname!==transitionTarget)return;
    const t=window.setTimeout(()=>setTransition(false),560);
    return()=>window.clearTimeout(t);
  },[pathname,transition,transitionTarget]);

  useEffect(()=>()=>{if(timeout.current) window.clearTimeout(timeout.current)},[]);

  const openHQ=()=>{
    if(sixMode||pathname==="/lyka"||transition||hqBusy)return;
    setHqBusy(true); setTransitionTarget("/lyka"); setTransitionLabel("LYKA HQ");
    window.setTimeout(()=>setTransition(true),10);
    timeout.current=window.setTimeout(()=>{router.push("/lyka");setHqBusy(false)},700);
  };

  useEffect(()=>{
    const key=(e:KeyboardEvent)=>{
      if(sixMode){e.preventDefault();return}
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();navigate("/archive");return}
      if(e.key.toLowerCase()==="q")openHQ();
      if(e.key.toLowerCase()==="b")navigate("/roast");
      if(e.key.toLowerCase()==="o")navigate("/mission");
    };
    window.addEventListener("keydown",key); return()=>window.removeEventListener("keydown",key);
  },[sixMode,pathname,transition]);

  useEffect(()=>{
    if(!sixMode)return;
    const guard=()=>{window.history.pushState({six:true},"",window.location.href)};
    window.history.pushState({six:true},"",window.location.href);
    window.addEventListener("popstate",guard); return()=>window.removeEventListener("popstate",guard);
  },[sixMode]);

  const answerSix=(value:string)=>{
    if(value!==sixQuestion.a[0]){setSixError("Galat. Six Mode bol raha hai: dobara soch, bhai.");return}
    setSixMode(false); setSixError(""); setSixQuestion(exitQuestions[Math.floor(Math.random()*exitQuestions.length)]);
  };

  return <div className={`site-root ${sixMode?"six-lock":""}`}>
    {!sixMode && <header className="topbar">
      <button className="brand" onClick={openHQ} aria-label="Open LYKA HQ">
        <span className="brand-mark"><span/><span/><span/></span>
        <span className="brand-copy"><b>LYKA</b><small>ANIK FIELD SYSTEM</small></span>
      </button>
      <div className="status-cluster"><span className="status-dot"/> SYSTEM LIVE <b>17</b></div>
      <button className="hq-chip" onClick={openHQ}>HQ <span>↗</span></button>
    </header>}

    <main className="page-wrap"><div className="content">{children}</div>
      <footer className="site-footer"><span>LYKA / ANIK FIELD SYSTEM</span><strong>Designed by Anik’s Lovely Father™</strong><em>matte glass / unnecessary engineering</em></footer>
    </main>

    {!sixMode && <nav className="dock" aria-label="Primary navigation">
      <button className="dock-logo" onClick={openHQ} aria-label="Open HQ"><span className="brand-mark small"><span/><span/><span/></span></button>
      {routes.map(([href,label])=><button key={href} onClick={()=>navigate(href)} className={pathname===href?"active":""}><span>{label}</span></button>)}
      <button className={pathname==="/six"?"six-tab":""} onClick={()=>navigate("/six")}>Six</button>
    </nav>}

    {danger&&!sixMode&&<div className={`danger-screen ${danger===null?"":"show"}`}>
      <div className="danger-noise"/><div className="danger-core"><span>CRITICAL / 0%</span><h2>{danger}</h2><p>{danger==="GHEE KHATAM"?"Bhai ne reserve poora uda diya.":danger==="COOL OVERFLOW"?"Confidence ne safety limit cross kar di.":"System ko samajhne ke liye Maths Sir ko bulao."}</p><button className="btn btn-hot" onClick={clearDanger}>SYSTEM KO SHAANT KAR</button></div>
    </div>}

    {sixMode&&<div className="six-virus-layer">
      <div className="six-grid"/>
      {Array.from({length:30},(_,i)=><span className="virus-tab" style={{left:`${(i*37)%102}%`,top:`${(i*61)%112}%`,animationDelay:`${(i%8)*.17}s`,transform:`rotate(${(i*17)%28-14}deg)`}} key={i}>{i%2?"MEETHE LOG AA GAYE":"ANIK / SIX"}</span>)}
      <div className="six-warning"><span>RESTRICTED SYSTEM</span><h1>MEETHE LOG AA GAYE.</h1><p>Anik meetha kutta aayega. Meethe se bachke. Normal navigation abhi band hai.</p><div className="six-lockline"><i/><i/><i/><i/><i/><i/></div></div>
      <div className="six-exit-modal">
        <span>ONLY EXIT</span><h2>Question ka jawab de.</h2><p>{sixQuestion.q}</p>
        <div className="answer-grid">{sixQuestion.a.map(v=><button key={v} data-six-answer onClick={()=>answerSix(v)}>{v}</button>)}</div>
        {sixError&&<div className="six-error">{sixError}</div>}
        <small>Correct answer ke bina Six Mode band nahi hoga.</small>
      </div>
    </div>}

    {transition&&<div className={`route-wipe tone-${tones[transitionTarget]||"home"}`}><div className="wipe-symbol"><span/><span/><span/></div><strong>{transitionLabel}</strong><small>LYKA // TRANSIT</small></div>}
  </div>
}
