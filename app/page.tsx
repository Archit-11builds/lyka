"use client";
import Link from "next/link";
export default function Home(){
  return <div className="page">
    <section className="hero-slab">
      <div className="hero-copy"><span className="eyebrow">ANIK FIELD SYSTEM / 001</span><h1>Aapka Anik ki <span>cool duniya</span> mein swagat hai.</h1><p className="lede">Ye biography nahi hai. Ye ek unnecessarily premium system hai jahan Maths, Free Fire, Anuched, Ghee aur ek space dog bina meeting ke ek saath aa gaye.</p><div className="button-row"><Link className="btn primary" href="/roast">Roast kholo ↗</Link><Link className="btn" href="/mission">Orbit jao ↗</Link></div></div>
      <div className="hero-photo"><img src="/photos/lyka-01.jpeg" alt="Lyka field photo"/><div className="photo-tag">REAL PHOTO / FAKE SCIENCE</div></div>
    </section>
    <section className="marquee"><span>BAN GAYA COOL</span><span>MATHS FAV + WORST</span><span>GHEE KHATAM</span><span>ANUCHHED</span><span>SANKI SCIENTIST</span><span>SPACE DOG</span></section>
    <section className="grid-3 cards-section"><Link href="/roast" className="glass-panel feature-card"><span>01</span><h2>Roast Lab</h2><p>Confidence ko controlled environment mein test kar.</p><b>Open →</b></Link><Link href="/maths-sir" className="glass-panel feature-card"><span>02</span><h2>Maths Sir</h2><p>Private tuition. Sawaal simple. Situation nahi.</p><b>Enter →</b></Link><Link href="/mission" className="glass-panel feature-card"><span>03</span><h2>Orbit</h2><p>Earth ke chakkar, random incidents aur ghee ka hisaab.</p><b>Launch →</b></Link></section>
    <section className="split-note"><div><span className="eyebrow">FIELD NOTE</span><h2>Confidence ka level alag hi department hai.</h2></div><p>Maths favourite bhi. Maths worst bhi. Anuradha se Anu, Anu se Anuched. Aur jab koi pooche cool? Bhai ke paas answer ready hota hai.</p></section>
  </div>
}
