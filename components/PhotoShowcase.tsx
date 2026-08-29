'use client';
import { useState } from 'react';
export function PhotoShowcase(){const [active,setActive]=useState(0); const photos=['/photos/lyka-01.jpeg','/photos/lyka-02.jpeg']; return <section className="photo-showcase">
 <div className="photo-copy"><div className="eyebrow">REAL FILES / NOT STOCK</div><h2>Lyka ki asli duniya.</h2><p>Do original photos. Zero stock-image bakwaas. Ek photo me Parle-G, doosre me anuched. Sanki scientist department ne approve kar diya.</p><div className="photo-tabs">{photos.map((_,i)=><button className={active===i?'selected':''} key={i} onClick={()=>setActive(i)}>0{i+1}</button>)}</div></div>
 <div className="photo-frame"><img src={photos[active]} alt="Lyka archive photo"/><div className="photo-caption">FIELD IMAGE / LYKA-{String(active+1).padStart(2,'0')}</div></div>
 </section>}
