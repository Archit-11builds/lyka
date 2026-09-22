'use client';

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '../../components/Reveal';

const quotes = [
  'Bhai ne button dekha aur immediately press kar diya.',
  'Scientific accuracy: questionable. Entertainment: approved.',
  'Anik.exe has stopped making normal decisions.',
  'Ghee levels critical. Confidence levels completely unaffected.',
];

export default function LmaoLab() {
  const [game, setGame] = useState('reaction');
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const [hits, setHits] = useState(0);
  const [time, setTime] = useState(15);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState(0);
  const [quote, setQuote] = useState(quotes[0]);
  const [math, setMath] = useState(null);
  const [mathScore, setMathScore] = useState(0);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const startReaction = () => {
    clearInterval(timer.current);
    setHits(0);
    setTime(15);
    setRunning(true);
    timer.current = setInterval(() => {
      setTime((v) => {
        if (v <= 1) {
          clearInterval(timer.current);
          setRunning(false);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  };

  const hit = () => {
    if (!running) return;
    setHits((v) => {
      const next = v + 1;
      setBest((b) => Math.max(b, next));
      return next;
    });
    setTarget({ x: 12 + Math.random() * 76, y: 16 + Math.random() * 68 });
  };

  const newMath = () => {
    const a = 2 + Math.floor(Math.random() * 9);
    const b = 2 + Math.floor(Math.random() * 9);
    setMath({ a, b, answer: a * b, opts: [a * b, a * b + 2, a * b - 3, a + b].sort(() => Math.random() - 0.5) });
  };

  const answerMath = (v) => {
    if (!math) return;
    const correct = v === math.answer;
    if (correct) setMathScore((s) => s + 1);
    setQuote(correct ? 'SAHI. Maths Sir temporarily approves.' : 'GALAT. Calculator ko blame mat kar.');
    newMath();
  };

  return (
    <div className="page lmao-page">
      <div className="page-hero lmao-hero">
        <div className="page-title">
          <span className="eyebrow">ROOM 09 / LMAO LAB / UNNECESSARY RESEARCH</span>
          <h1>Nothing useful.<br /><em>Maximum fun.</em></h1>
          <p className="lede">Three tiny games. Zero academic value. Extremely important research.</p>
        </div>
        <div className="lmao-stamp">NOT<br />SERIOUS</div>
      </div>

      <div className="lmao-tabs glass">
        {[['reaction', 'GHEE CATCH'], ['math', 'MATH PANIC'], ['quote', 'ANIK.EXE']].map(([id, label]) => (
          <button key={id} className={game === id ? 'active' : ''} onClick={() => setGame(id)}>{label}</button>
        ))}
      </div>

      <Reveal className="lmao-grid">
        {game === 'reaction' && (
          <div className="glass lmao-game reaction-game">
            <div className="game-head"><span className="eyebrow">01 / REFLEX TEST</span><b>{time}s</b></div>
            <div className="reaction-arena">
              <div className="reaction-copy"><small>GHEE TARGET</small><strong>{hits}</strong><span>hits / 15 seconds</span></div>
              {running ? <button className="ghee-target" style={{ left: target.x + '%', top: target.y + '%' }} onClick={hit}>G</button> : <button className="start-orb" onClick={startReaction}>{time === 0 ? 'AGAIN' : 'START'}</button>}
            </div>
            <div className="game-foot"><span>BEST / {best}</span><span>{running ? 'CATCH IT.' : 'PRESS START.'}</span></div>
          </div>
        )}

        {game === 'math' && (
          <div className="glass lmao-game math-panic">
            <div className="game-head"><span className="eyebrow">02 / EMERGENCY CALCULATION</span><b>{mathScore} correct</b></div>
            <div className="panic-core">
              {!math ? <><small>THE QUESTION IS WAITING.</small><h2>Can you survive<br /><em>Maths Panic?</em></h2><button className="button hot" onClick={newMath}>START PANIC →</button></> : <><span className="panic-timer">ANSWER NOW</span><h2>{math.a} × {math.b} = ?</h2><div className="panic-options">{math.opts.map((v) => <button key={v} onClick={() => answerMath(v)}>{v}</button>)}</div></>}
            </div>
            <div className="game-foot"><span>STREAK / {mathScore}</span><span>NO CALCULATOR ENERGY.</span></div>
          </div>
        )}

        {game === 'quote' && (
          <div className="glass lmao-game exe-game">
            <div className="game-head"><span className="eyebrow">03 / ANIK.EXE</span><b>SIMULATION</b></div>
            <div className="exe-screen">
              <div className="terminal-lines"><span>BOOTING ANIK.EXE...</span><span>CONFIDENCE ........ 100%</span><span>LOGIC ............. LOADING</span><span>GHEE .............. {hits > 2 ? 'CRITICAL' : 'STABLE'}</span><span>COMMON SENSE ...... NOT FOUND</span></div>
              <h2>{quote}</h2>
              <button className="button hot" onClick={() => { setHits((v) => v + 1); setQuote(quotes[Math.floor(Math.random() * quotes.length)]); }}>RUN AGAIN ↻</button>
            </div>
          </div>
        )}
      </Reveal>

      <div className="lmao-bottom"><span>LYKA RESEARCH DEPARTMENT</span><b>NO PURPOSE DETECTED</b><span>STATUS / VERY ONLINE</span></div>
    </div>
  );
}
