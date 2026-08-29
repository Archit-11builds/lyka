
"use client";

import {useState} from "react";

export default function Home(){
 const [music,setMusic]=useState(false);
 const [scan,setScan]=useState("");

 function start(){
   setMusic(!music);
 }

 return <main>
 <div className="entry">
   <div className="logo">🐕 LYKA™</div>
   <p>CLASSIFIED ANIK INVESTIGATION FILE #006</p>
   <button onClick={start}>{music?"🔊 SOUND ON":"ENTER THE ARCHIVE"}</button>
 </div>

 <nav>🐕 LYKA™ | ROAST LAB | GOPAL SIR FILES | LAIKA ARCHIVE</nav>

 <section className="hero">
  <h1>THE ANIK INCIDENT</h1>
  <p>Ek banda. Infinite confidence. Aur duniya abhi tak confused.</p>
 </section>

 <section>
  <img className="dog" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Laika_%28Soviet_dog%29.jpg/640px-Laika_%28Soviet_dog%29.jpg"/>
  <h2>LAIKA SPACE ARCHIVE 🚀</h2>
  <p>Click nahi? Dog already judging Anik.</p>
 </section>

 <section>
  <h2>ANIK CLASSIFIED FILE</h2>
  <p>Name: Anik</p>
  <p>Nickname: Lyka</p>
  <p>Gender: SIX™</p>
  <p>Profession: Sanki Scientist</p>
 </section>

 <section>
  <h2>Gopal Sir Maths Department</h2>
  <p>Gopal Sir: Question solve karo.</p>
  <p>Anik: Sir pehle question ka confidence check karte hain.</p>
  <p>Maths: Bhai mujhe beech mein mat lao 💀</p>
 </section>

 <section>
  <h2>BAN GAYA COOL™ Scanner</h2>
  <button onClick={()=>setScan("Scanning... Confidence MAX. Proof missing 💀")}>
   SCAN ANIK
  </button>
  <p>{scan}</p>
 </section>

 <section>
  <h2>Hindi Roast Machine</h2>
  <p>
  Anik bola: "Main best hu."<br/>
  Universe bola: "Source?"<br/>
  Anik: "Confidence."
  </p>
 </section>

 <section>
  <h2>Anuched Department</h2>
  <p>Anu + Anuchhed = unlimited writing power.</p>
 </section>

 <footer>
 Designed by Anik's Lovel Father™
 </footer>

 </main>
}
