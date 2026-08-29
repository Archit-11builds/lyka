'use client';
import { useState } from 'react';
const lines=[
 'Bhai ka confidence 5G hai, answer abhi 2G.',
 'Gopla Sir ne question diya, Anik ne pehle attitude submit kiya.',
 'Ek kill mila aur bhai ne CV me CEO likh diya.',
 'Maths favourite bhi, Maths worst bhi. Ye syllabus nahi, multiverse hai.',
 'Anu se Anuched tak ka safar kisi ne nahi manga tha, par lore ban gaya.',
 'Sanki scientist ka experiment: pehle result, baad me hypothesis.',
 'Ghee kam hua toh ghar nahi, poora department alert ho gaya.',
 'Bhai ko cool bolne ki zarurat nahi. Woh khud notification bhej deta hai.',
 'Gender field ne 6 dekha aur database ne kaha: theek hai bhai.',
 'Lyka ko space bhejne ka reason science nahi tha. System ko break chahiye tha.'
];
export function RandomJoke(){const [line,setLine]=useState(lines[0]);return <div className="joke-widget"><div className="eyebrow">RANDOM BAKCHODI / LIVE</div><p key={line}>{line}</p><button className="mini-btn" onClick={()=>setLine(lines[Math.floor(Math.random()*lines.length)])}>aur ek suna →</button></div>}
