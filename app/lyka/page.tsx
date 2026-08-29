"use client";

import Link from "next/link";
import { useMemo } from "react";
import { GheePanel } from "@/components/Widgets";
import { useSite } from "@/components/SiteProvider";

const lore = [
  { year: "ORIGIN", title: "Anik appears.", text: "Duniya ko laga normal baccha hai. Database ne turant galat prove kar diya." },
  { year: "EARLY FILE", title: "Lyka naam activate hua.", text: "Dog resemblance officially friend-group research ka part ban gaya." },
  { year: "MATHS ERA", title: "Maths favourite bhi. Worst bhi.", text: "Ek hi subject ne do departments sambhal liye. Maths Sir abhi tak dekh rahe hain." },
  { year: "ANU ERA", title: "Anuradha → Anu → Anuched.", text: "Syllabus mein aisa side quest kisi ne nahi manga tha, par mil gaya." },
  { year: "CURRENT", title: "Ban Gaya Cool.", text: "Ek chhota flex aur poora system confidence mode mein chala jaata hai." },
];

const roastNotes = [
  ["Confidence", "Bhai ka confidence 5G hai. Answer abhi 2G."],
  ["Maths", "Maths favourite bhi, worst bhi. Subject ko khud samajh nahi aa raha."],
  ["Free Fire", "Ek kill ke baad commentary aisi jaise world final jeet liya."],
  ["Scientist", "Hypothesis strong. Result kabhi-kabhi missing."],
  ["Anuched", "Topic kuch bhi ho, Anu ka connection nikal aata hai."],
  ["Coolness", "Bhai bas shirt seedhi karta hai aur ban gaya cool."],
];

export default function HQ() {
  const { ghee, coolCount } = useSite();
  const reality = Math.max(7, Math.round(100 - (coolCount % 21) * 3.2));
  const confidence = Math.min(999, 88 + coolCount * 7);
  const featured = useMemo(() => roastNotes[(coolCount + 2) % roastNotes.length], [coolCount]);

  return (
    <div className="page hq-page">
      <section className="hq-hero glass-panel">
        <div className="hq-hero-copy">
          <span className="eyebrow">LYKA HQ / THE ANIK DOSSIER</span>
          <div className="hq-overline">Aapka Anik ki cool duniya mein swagat hai.</div>
          <h1>Anik.<br /><span>Poora case file.</span></h1>
          <p className="lede">Yeh control room nahi. Yeh woh jagah hai jahan Anik ki history, confidence aur faltu achievements ko unnecessarily premium treatment milta hai.</p>
          <div className="hq-hero-actions">
            <Link className="btn primary" href="/archive">Case files kholo ↗</Link>
            <Link className="btn" href="/photos">Photo room ↗</Link>
          </div>
        </div>
        <div className="hq-portrait-stack">
          <figure className="hq-photo hq-photo-main"><img src="/photos/lyka-01.jpeg" alt="Anik field photo" /></figure>
          <figure className="hq-photo hq-photo-side"><img src="/photos/lyka-02.jpeg" alt="Anik second field photo" /></figure>
          <div className="hq-stamp">SUBJECT / ANIK<br /><strong>LYKA-01</strong></div>
        </div>
      </section>

      <section className="hq-stat-ribbon glass-panel">
        <div><small>COOL COUNT</small><strong>×{coolCount}</strong><span>Ban Gaya Cool attempts</span></div>
        <div><small>REALITY INDEX</small><strong>{reality}%</strong><span>Abhi thoda bacha hai</span></div>
        <div><small>CONFIDENCE</small><strong>{confidence}%</strong><span>Reason unknown</span></div>
        <div><small>GHEE</small><strong>{ghee}%</strong><span>{ghee === 0 ? "GHEE KHATAM" : "Reserve active"}</span></div>
      </section>

      <section className="hq-feature-grid">
        <div className="glass-panel hq-feature hq-feature-wide">
          <div className="section-kicker-row"><span className="kicker">THE ANIK TIMELINE</span><span>Origin → abhi</span></div>
          <div className="timeline">
            {lore.map((item) => (
              <article key={item.year} className="timeline-item">
                <span className="timeline-year">{item.year}</span>
                <div><h3>{item.title}</h3><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-panel hq-feature hq-highlight-card">
          <span className="kicker">LIVE CASE NOTE</span>
          <div className="hq-highlight-photo"><img src="/photos/lyka-02.jpeg" alt="Anik case note" /></div>
          <small>{featured[0]}</small>
          <h2>{featured[1]}</h2>
          <p>Case system har baar naya verdict nikaalta hai. Aaj ka verdict bhi unnecessary confidence ke favour mein gaya.</p>
          <Link className="text-link" href="/roast">Roast Lab →</Link>
        </div>
      </section>

      <section className="hq-feature-grid hq-feature-grid-bottom">
        <div className="glass-panel hq-feature split-image-card">
          <div className="split-image"><img src="/photos/lyka-01.jpeg" alt="Anik archive" /></div>
          <div className="split-copy">
            <span className="kicker">ON TUITION / OFF TUITION</span>
            <h2>Do alag Anik.</h2>
            <p><strong>On tuition:</strong> Maths Sir ke saamne serious mode.</p>
            <p><strong>Off tuition:</strong> Ban gaya cool mode already loaded.</p>
            <Link className="text-link" href="/maths-sir">Maths Sir desk →</Link>
          </div>
        </div>

        <div className="glass-panel hq-feature hq-roast-board">
          <div className="section-kicker-row"><span className="kicker">UNNECESSARY FACTS</span><span>100% unofficial</span></div>
          <div className="fact-grid">
            <div><b>01</b><span>Favourite + worst subject: Maths.</span></div>
            <div><b>02</b><span>Anuradha → Anu → Anuched.</span></div>
            <div><b>03</b><span>Sanki Scientist certification pending.</span></div>
            <div><b>04</b><span>One kill = seventeen minute commentary.</span></div>
            <div><b>05</b><span>Horse-jawline joke remains unresolved.</span></div>
            <div><b>06</b><span>Father field: Khali. Database: confused.</span></div>
          </div>
        </div>
      </section>

      <section className="hq-bottom-strip glass-panel">
        <div><span className="eyebrow">THE FINAL FINDING</span><h2>Bhai cool banna allowed hai.</h2><p>Bas har 12 second mein press conference zaroori nahi hai.</p></div>
        <div className="hq-bottom-actions"><Link className="btn primary" href="/memes">Meme Vault kholo</Link><Link className="btn" href="/mission">Space mein bhejo</Link></div>
      </section>

      <div className="hq-ghee"><GheePanel /></div>
    </div>
  );
}
